<template>
  <div class="background">
    <h2>We found {{ number }} results for {{ cityName }}...</h2>
    <ul>
      <li 
        v-for="(city, index) in duplicateCityList"
        :key="index"
      >
        <input type="checkbox" v-model="checkedCityList" :value="city">
        {{ cityName }}, {{ city.state && city.state }} {{ city.country }}
      </li>
    </ul>
    <div class="button-holder">
      <button @click="confirmCity">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUpModal',
  data: () => ({
    checkedCityList: []
  }),
  props: {
    number: Number,
    cityName: String,
    isOpenPopUp: Boolean,
    duplicateCityList: Array
  },
  emits: ['update:isOpenPopUp', 'update:duplicateCityList'],
  methods: {
    confirmCity () {
      this.$emit('update:isOpenPopUp', !this.isOpenPopUp);
      this.$emit('update:duplicateCityList', this.checkedCityList);
    }
  } 
}
</script>

<style scoped>
.background {
  width:48vw;
  max-height: 90vh;
  background: var(--text_light);
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

ul {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  list-style: none;
}

ul input {
  -webkit-appearance: checkbox;
}

button {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 15px 20px;
  margin-left: 15px;
  border-radius: 5px;
  background: var(--red);
  transition: background 0.3s ease-in-out;
  color: var(--text_light);
  width: 7rem;
  align-items: center;
}

.button-holder {
  display: flex;
  justify-content: flex-end;
}

button:hover {
  background: var(--darkred);
}
</style>