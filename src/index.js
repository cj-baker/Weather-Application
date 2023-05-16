let now = new Date();
let currentDay = document.querySelector("div.current-day");
let currentTime = document.querySelector("div.current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentDay.innerHTML = day;
currentTime.innerHTML = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

let getCurrentLocation = document.querySelector("#current-location-button");
getCurrentLocation.addEventListener("click", getLocalTemp);

function getLocalTemp() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "1098686bcbb41f221c2aec962bdfe6fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showLocalTemperature);
}
function showLocalTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}F°`;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${city}`;
  document.querySelector("#current-high").innerHTML = `H: ${high}°`;
  document.querySelector("#current-low").innerHTML = `L: ${low}°`;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "1098686bcbb41f221c2aec962bdfe6fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showCityTemperature);
}

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#current-location");
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  cityTemp.innerHTML = `${temperature}°F`;
  currentCity.innerHTML = response.data.name;
  document.querySelector("#current-high").innerHTML = `H: ${high}°`;
  document.querySelector("#current-low").innerHTML = `L: ${low}°`;
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", changeCity);
