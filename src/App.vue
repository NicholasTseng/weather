<template>
  <WeatherModal/>
</template>

<script>
import WeatherModal from './views/WeatherModal.vue'

export default {
  name: 'App',
  components: {
    WeatherModal
}
}
</script>

<style>
:root {
  --sky-blue: #7cb2ee;
  --white: #f2fbff;
  --mid-night-blue: #110e3a;

}

body {
  background: var(--sky-blue);
  margin: 0;
}
</style>
