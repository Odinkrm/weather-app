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
//Daily weather forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day + 1];
}
function updateForcast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastHTML = ` <div class="row d-flex justify-content-around">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 other-days">
            <h3>${formatDay(forecastDay.dt)}</h3>
            <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="weather-icon"
                  />
            <br />
            <span> ${Math.round(forecastDay.temp.day)}°</span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#daily-forcast").innerHTML = forecastHTML;
}
function getCoords(coordinates) {
  let apiKey = "c77c0f857560425c32ee92917087a412";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateForcast);
}
// Updating weather info & city name on the website
function updateWeather(response) {
  let weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentWindSpeed = Math.round((response.data.wind.speed * 18) / 5);
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${currentWindSpeed}km/hr`;
  let currentHumidity = response.data.main.humidity;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${currentHumidity}%`;
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  document.querySelector(
    "#feels-like"
  ).innerHTML = `Feels Like: ${currentFeelsLike}°C`;

  getCoords(response.data.coord);
}
let celsiusTemperature = null;
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
  let apiKey = "c77c0f857560425c32ee92917087a412";
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

// Setting Las Vegas as default loading city to display
function defaultCity(city) {
  let apiKey = "c77c0f857560425c32ee92917087a412";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
defaultCity("las vegas");
