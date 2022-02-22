// Showing current time in correct format
function timeFormat(currentTime) {
  let day = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let h2 = document.querySelector("#current-time");
  h2.innerHTML = `${days[day]} ${hour}:${minute}`;
}
timeFormat(new Date());
// Updating weather info & city name on the website
function updateWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let currentWindSpeed = Math.round((response.data.wind.speed * 18) / 5);
  document.querySelector("#wind");.innerHTML = `Wind Speed: ${currentWindSpeed}km/hr`;
  let currentHumidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity: ${currentHumidity}%`;
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `Feels Like: ${currentFeelsLike}°C`;
}
// Constructing the weather api url for the searched city
function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "c77c0f857560425c32ee92917087a412";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}
let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", updateCity);
// Constructing the weather api url for the current city with geolocation
function currentCity(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}
let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", getCurrentPosition);
// Converting unit to Celsius
function converToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round((temperature.innerHTML - 32) * (5 / 9));
}
let inCelsius = document.querySelector("#in-celsius");
inCelsius.addEventListener("click", converToCelsius);
// Converting unit to Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round((9 / 5) * temperature.innerHTML + 32);
}
let inFahrenheit = document.querySelector("#in-fahrenheit");
inFahrenheit.addEventListener("click", convertToFahrenheit);
