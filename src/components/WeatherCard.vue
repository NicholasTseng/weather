<template>
  <div class="city">
    <div v-if="!ready"><img src = "../assets/spinner-dark.svg"></div>
    <div v-if="ready">
      <h2 class="city-name">
        <span><span v-if="position"></span>{{ cityName }}</span>
        <sup>{{ country }}</sup>
        <sup v-if="state">{{ state }}</sup>
      </h2>
      <span class="city-temp">{{ temperature }}<sup>°C</sup></span>
      <figure>
        <img class="city-icon" :src="iconUrl" :alt="weatherDescription">
        <figcaption>{{ weatherDescription }}</figcaption>
        <figcaption>Minimum: {{ minTemperature }}<sup>°C</sup><br/>Maximum: {{ maxTemperature }}<sup>°C</sup></figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import { getTemperatureByCityId, getTemperatureByPosition } from '../weather';

export default {
  name: 'WeatherCard',
  data: () => ({
    temperature: 0,
    minTemperature: 0,
    maxTemperature: 0,
    cityName: '',
    ready: false,
    weatherDescription: '',
    iconUrl: '',
    country: '',
    state:''
  }),
  props: {
    city: Object,
    position: Object
  },
  async mounted () {
    this.ready = false;
    const response = this.position ? await getTemperatureByPosition(this.position) : await getTemperatureByCityId(this.city.id);
    const iconId = response.data.weather[0].icon;
    this.temperature = Math.round(response.data.main.temp * 10) / 10;
    this.minTemperature = Math.round(response.data.main.temp_min * 10) / 10;
    this.maxTemperature = Math.round(response.data.main.temp_max * 10) / 10;
    this.cityName = response.data.name;
    this.weatherDescription = response.data.weather[0].description;
    this.iconUrl = require(`../assets/weather-icon/${iconId}.svg`);
    this.country = response.data.sys.country;
    this.state = this.city && this.city.state;
    this.ready = true;
  }
}
</script>

<style scoped>
.city {
  position: relative;
  padding: 40px 10%;
  border-radius: 20px;
  background: var(--text_light);
  color: var(--text_med);
}
 
figcaption {
  margin-top: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
 
.city-temp {
  font-size: 5rem;
  font-weight: bold;
  margin-top: 10px;
  color: var(--text_dark);
}
 
.city sup {
  font-size: 0.5em;
}
 
.city-name sup {
  padding: 0.2em 0.6em;
  border-radius: 30px;
  color: var(--text_light);
  background: var(--orange);
  margin-left: 0.2rem;
}

.city-name sup:nth-child(3) {
  background: var(--text_med);
}

.city-name span span::before {
  content: "";
  display: inline-block;
  background: url("../assets/current-location.svg") no-repeat;
  width: 1em;
  height: 0.8em;
  filter: invert(37%) sepia(8%) saturate(1514%) hue-rotate(180deg) brightness(96%) contrast(90%);
}
 
.city-icon {
  margin-top: 10px;
  width: 100px;
  height: 100px;
}
</style>