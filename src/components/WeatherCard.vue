<template>
  <div class="city">
    <div v-if="!ready"><img src = "../assets/spinner-dark.svg"></div>
    <div v-if="ready">
      <h2 class="city-name">
        <span>{{ cityTrueName }}</span>
        <sup>{{ country }}</sup>
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
import { getTemperatureByCity } from '../weather';

export default {
  name: 'WeatherCard',
  data: () => ({
    temperature: 0,
    minTemperature: 0,
    maxTemperature: 0,
    cityTrueName: '',
    ready: false,
    weatherDescription: '',
    iconUrl: '',
    country: ''
  }),
  props: {
    city: String,
    currentMonth: String,
    currentDay: Number,
  },
  mounted () {
    this.ready = false;
    getTemperatureByCity(this.city).then((res) => {
      const iconId = res.data.weather[0].icon;
      this.temperature = Math.round(res.data.main.temp * 10) / 10;
      this.minTemperature = Math.round(res.data.main.temp_min * 10) / 10;
      this.maxTemperature = Math.round(res.data.main.temp_max * 10) / 10;
      this.cityTrueName = res.data.name;
      this.weatherDescription = res.data.weather[0].description;
      this.iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
      this.country = res.data.sys.country;
      this.ready = true;
    });
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
 
.city::after {
  content: ’’;
  width: 90%;
  height: 50px;
  position: absolute;
  bottom: -12px;
  left: 5%;
  z-index: -1;
  opacity: 0.3;
  border-radius: 20px;
  background: var(--text_light);
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
 
.city-icon {
  margin-top: 10px;
  width: 100px;
  height: 100px;
}
</style>