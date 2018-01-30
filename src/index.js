'use strict';
let humidity;
let pressure;
let temperature;
let windSpeed;
let weatherSummary;
let timezone;

const apiURL = 'https://api.darksky.net';
const key = 'ca1918351256b0abf79ba610b728e5bd';
const format = '?units=auto&format=jsonp&callback=displayWeather';


let selector = (id) => document.getElementById(id);

window.onload = () => {
  humidity = selector('humidity');
  pressure = selector('pressure');
  temperature = selector('temperature');
  timezone = selector('timezone');
  weatherSummary = selector('weather-summary');
  windSpeed = selector('windSpeed');
};

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      showResult(latitude, longitude)
    })
  } else { alert('Could not get your location')}
}

function showResult(latitude, longitude) {
  const url = `${apiURL}/forecast/${key}/${latitude},${longitude}` + `${format}`;
  const script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
  displayWeather();
}

function displayWeather(data) {
  timezone.innerHTML = 'Location: '  + data.timezone;
  humidity.innerHTML = 'Humidity: ' + humidityPercentage(data.currently.humidity) + ' %';
  pressure.innerHTML = 'Pressure: ' + data.currently.pressure + ' mb';
  temperature.innerHTML = 'Temperature: ' + data.currently.temperature + ' °C';
  windSpeed.innerHTML = 'Wind speed: ' + data.currently.windSpeed + ' km/h';
  weatherSummary.innerHTML = data.currently.summary;
}

function humidityPercentage(h) {
  return Math.round(h * 100);
}
