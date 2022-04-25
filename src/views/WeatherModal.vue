<template>
  <div class="modal">
    <div class="info"></div>
    <div class="todayWeather">
      <div v-if="ready">
        <p style = "color: white;">{{ currentMonth }} {{ currentDay }}</p>
        <p style = "color: white;">{{ currentCity }}</p>
        <p style = "color: white;">{{ currentTemperature }}</p>
        <p style = "color: white;">{{ minTemperature }}</p>
        <p style = "color: white;">{{ maxTemperature }}</p>
      </div>
      <div v-if="!ready"><img src = "../assets/spinner.svg"></div>
    </div>
  </div>
</template>

<script>
import { getTemperatureByPosition } from '../weather';

export default {
  name: 'WeatherModal',
  data: () => ({
    currentTemperature: 0,
    minTemperature: 0,
    maxTemperature: 0,
    ready: false,
    currentPosition: {},
    currentCity: '',
    currentMonth: 0,
    currentDay: 0,
    month: {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    }
  }),
  mounted () {
    const date = new Date();
    this.currentDay = date.getDate();
    this.currentMonth = this.month[date.getMonth() + 1];
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentPosition = position;
    })
  },
  watch: {
    currentPosition () {
      getTemperatureByPosition(this.currentPosition).then((res) => {
        this.currentTemperature = Math.round(res.data.main.temp * 10) / 10;
        this.minTemperature = Math.round(res.data.main.temp_min * 10) / 10;
        this.maxTemperature = Math.round(res.data.main.temp_max * 10) / 10;
        this.currentCity = res.data.name;
        this.ready = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  width:72vw;
  display: flex;
  height:80vh;
  justify-content: center;
  margin:10vh auto;
  border-radius:24px;
  overflow:hidden;
}

.todayWeather {
  background: var(--mid-night-blue);
  width:35%;
  height:100%;
}

.info {
  background: var(--white);;
  width:65%;
  height:100%;
}
</style>
