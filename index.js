function todaysDate(event) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let localTime = [
    1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12,
  ];
  let now = new Date();
  let today = days[now.getDay()];
  let hour = localTime[now.getHours()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${today} ${hour}:${minutes}`;
}
let currentTime = document.querySelector("p#currentTime");
currentTime.innerHTML = todaysDate();

function citySearch(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city");
  let apiKey = "8c90923b79edc1e45f5b0da40d4f4794";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
}

let search = document.querySelector("#citySearch");
search.addEventListener("submit", citySearch);

function changeToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = farenheitTemp;
}
function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemp = ((farenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", changeToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let farenheitTemp = null;

function getTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  farenheitTemp = Math.round(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let newCityTemp = document.querySelector("#temperature");
  newCityTemp.innerHTML = `${temperature}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let humidity = response.data.main.humidity;
  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemp);
}

function getCurrentLocationTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8c90923b79edc1e45f5b0da40d4f4794";
  let units = "imperial";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getTemperature);
}

let currentLocationButton = document.querySelector("#currentLocationTemp");
currentLocationButton.addEventListener("click", currentLocation);

function formatDay(actualDay) {
  let date = new Date(actualDay * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="54"
            />
            <div class="weather-forecast-temps">
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
currentLocation("event");
