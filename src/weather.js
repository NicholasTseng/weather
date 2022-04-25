import axios from "axios";

const urlBase = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '9690b17513bd322138a06b169c76d30e';

export const getTemperature = (city = null) => {
  if (navigator.geolocation && !city) {
    return navigator.geolocation.getCurrentPosition(getTemperatureByPosition);
  } else {
    return getTemperatureByCity(city);
  }
}

export const getTemperatureByPosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  return axios.get(`${urlBase}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
}

function getTemperatureByCity (city) {
  return axios.get(`${urlBase}weather?/q=${city}&appid=${apiKey}`)
}

