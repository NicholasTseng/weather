<template>
  <section class="top-banner">
    <div class="container center">
      <h1 class="heading">Weather</h1>
      <div class="search-bar">
        <input type="text" v-model="searchCity" autofocus>
        <button @click="search">Search</button>
        <span class="msg"></span>
      </div>
    </div>
  </section>
  <section class="cards">
    <div class="spinner" v-if="!ready"><img src = "../assets/spinner.svg"></div>
    <div class="container">
      <div class="cities">
        <WeatherCard
          v-if="currentCity"
          :city="currentCity"
          :currentDay="currentDay" 
          :currentMonth="currentMonth"
        />
        <WeatherCard
          v-for="(city, index) in citys"
          :key="index"
          :city="city.name"
          :currentDay="currentDay" 
          :currentMonth="currentMonth"
        />
    </div>
    </div>
  </section>
</template>

<script>
import { getLocationByPosition } from '../weather';
import WeatherCard from '@/components/WeatherCard.vue';

export default {
  name: "WeatherModal",
  data: () => ({
    ready: false,
    currentPosition: {},
    currentCity: '',
    currentMonth: '',
    currentDay: 0,
    month: {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    },
    searchCity:'',
    citys: []
  }),
  mounted() {
    const date = new Date();
    this.currentDay = date.getDate();
    this.currentMonth = this.month[date.getMonth() + 1];
    navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = position;
    });
  },
  methods: {
    search () {
      this.citys.push({ 
        name: this.searchCity 
      });
      this.searchCity = '';
    }
  },
  watch: {
    currentPosition() {
      this.ready = true;
      getLocationByPosition(this.currentPosition).then((res) => {
        this.currentCity = res.data.name;
      });
    }
  },
  components: {
    WeatherCard
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.spinner {
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.top-banner {
  color: var(--text_light);
}
 
.heading {
  font-weight: bold;
  font-size: 4rem;
  letter-spacing: 0.02em;
  padding: 0 0 30px 0;
}
 
.top-banner .search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
 
.top-banner .search-bar input {
  font-size: 2rem;
  height: 40px;
  padding: 5px 5px 10px;
  border-bottom: 1px solid;
}
 
.top-banner .search-bar input::placeholder {
  color: currentColor; 
}
 
.top-banner .search-bar button {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 15px 20px;
  margin-left: 15px;
  border-radius: 5px;
  background: var(--red);
  transition: background 0.3s ease-in-out;
}
 
.top-banner .search-bar button:hover {
  background: var(--darkred);
}
 
.top-banner .search-bar .msg {
  position: absolute;
  bottom: -40px;
  left: 0;
  max-width: 450px;
  min-height: 40px;
}

.card {
  margin: 50px 0 20px;
}

.cards .cities {
  display: grid;
  grid-gap: 32px 20px;
  grid-template-columns: repeat(4, 1fr);
}

@media screen and (max-width: 1000px) { 
  section .cities {
    grid-template-columns: repeat(3, 1fr);
  }
}
 
@media screen and (max-width: 700px) {
  section .cities {
    grid-template-columns: repeat(2, 1fr);
  }

  .top-banner .search-bar {
    flex-direction: column;
  }

  .top-banner .search-bar button {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 15px 20px;
    margin-left: 15px;
    border-radius: 5px;
    background: var(--red);
    transition: background 0.3s ease-in-out;
  }
 
  .top-banner .search-bar button:hover {
    background: var(--darkred);
  }
}
 
@media screen and (max-width: 500px) {  
  section .cities {
    grid-template-columns: repeat(1, 1fr);
  }

  .top-banner .search-bar {
    flex-direction: column;
  }
   
  .top-banner .search-bar input,
  .top-banner .search-bar button {
    width: 100%;
  }
 
  .top-banner .search-bar button {
    margin: 20px 0 0 0;
  }
   
  .top-banner .search-bar .msg {
    position: static;
    max-width: none;
    min-height: 0;
    margin-top: 10px;
  }
}
</style>
