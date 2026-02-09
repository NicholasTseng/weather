import axios from "axios";

const urlBase = 'https://api.openweathermap.org/data/2.5/';
const apiKey = process.env.OPENWEATHER_API_KEY;

export const getTemperatureByPosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  return axios.get(`${urlBase}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric`);
}

export const getTemperatureByCityId = (cityId) => {
  return axios.get(`${urlBase}weather?id=${cityId}&appid=${apiKey}&units=metric`)
}

