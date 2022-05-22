<template>
  <div v-if="isOpenPopUp" class="modal">
    <PopUpModal
      v-model:isOpenPopUp = "isOpenPopUp"
      v-model:duplicateCityList = "duplicateCityList"
      :cityName="duplicateCityName"
      :number="duplicateCityLength"
    />
  </div>
  <div :class="[isOpenPopUp ? 'blur-background' : '', 'top-banner' ]">
    <div class="container center">
      <h1 class="heading">Weather</h1>
      <div class="search-bar">
        <input type="text" v-model="searchCity">
        <button @click="search">Search</button>
        <span class="msg"></span>
      </div>
    </div>
  </div>
  <div :class="[isOpenPopUp ? 'blur-background' : '', 'cards' ]">
    <div class="spinner" v-if="!geoReady"><img src = "../assets/spinner.svg"></div>
    <div class="container">
      <div class="cities">
        <WeatherCard
          v-if="geoReady"
          :position="currentPosition"
        />
        <WeatherCard
          v-for="(city, index) in cityIds"
          :key="index"
          :city="city"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue';
import PopUpModal from '@/components/PopUpModal.vue';

export default {
  name: "WeatherView",
  data: () => ({
    geoReady: false,
    currentPosition: {},
    searchCity:'',
    cityIds: [],
    cityList: [],
    duplicateCityName: '',
    isOpenPopUp: false,
    duplicateCityLength: 0,
    duplicateCityList: [],
  }),
  mounted() {
    this.cityList = require('../city.list.json');
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentPosition = position;
    });
  },
  methods: {
    search () {
      const city = this.cityList.filter(
        (city) => city.name.toLowerCase() === this.searchCity.toLowerCase()
      );

      if (city.length > 1) {
        this.duplicateCityLength = city.length;
        this.duplicateCityName = city[0].name;
        this.duplicateCityList = city;
        this.isOpenPopUp = true;
      } else {
        this.cityIds.push(...city);
      }

      this.searchCity = '';
    }
  },
  watch: {
    currentPosition () {
      this.geoReady = true;
    },
    isOpenPopUp () {
      !this.isOpenPopUp && this.cityIds.push(...this.duplicateCityList);
    }
  },
  components: {
    WeatherCard,
    PopUpModal
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

.modal {
  position:fixed;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.blur-background {
  filter: blur(8px);
}

@media screen and (max-width: 1000px) { 
  div .cities {
    grid-template-columns: repeat(3, 1fr);
  }
}
 
@media screen and (max-width: 700px) {
  div .cities {
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
  .cards .cities {
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
