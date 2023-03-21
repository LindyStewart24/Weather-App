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
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = 78;
}
function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = 26;

  let farenheitTemp = document.querySelector("#farenheitLink");
  farenheitTemp.addEventListener("click", changeToFarenheit);
  var celsiusTemp = document.querySelector("#celsiusLink");
  celsiusTemp.addEventListener("click", changeToCelsius);
}

function getTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let newCityTemp = document.querySelector("#farenheitTemp");
  newCityTemp.innerHTML = `${temperature}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let humidity = response.data.main.humidity;
  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
}

function currentLocation(event) {
  event.preventDefault();
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
