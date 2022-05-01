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
@font-face {
  font-family: 'Sofia Pro';
  src:  url('./assets/Sofia\ Pro\ Regular.ttf') format('ttf');
}

:root {
  --bg_main: #0a1f44;
  --text_light: #fff;
  --text_med: #53627c;
  --text_dark: #1e2432;
  --red: #ff1e42;
  --darkred: #c3112d;
  --orange: #ff8c00;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: normal;
}
 
button {
  cursor: pointer;
}
  
input {
  -webkit-appearance: none;
}
  
button,
input {
  border: none;
  background: none;
  outline: none;
  color: inherit;
}
 
img {
  display: block;
  max-width: 100%;
  height: auto;
}
 
body {
  font-family: 'Sofia Pro';
  background: var(--bg_main);
  color: var(--text_dark);
  padding: 50px;
}
</style>
