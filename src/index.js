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
  console.log(response);
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
  fahrenheitTemp = response.data.main.temp;
  cityTemp.innerHTML = `${temperature}°F`;
  currentCity.innerHTML = response.data.name;
  document.querySelector("#current-high").innerHTML = `H: ${high}°`;
  document.querySelector("#current-low").innerHTML = `L: ${low}°`;
  updateIcon(response);
}

function updateIcon(response) {
  console.log(response);
  let icon = response.data.weather[0].icon;
  console.log(icon);
  let iconElement = document.querySelector("#main-icon");
  if (icon === "01d") {
    iconElement.setAttribute("class", "fa-solid fa-sun fa-beat-fade");
  } else if (icon === "01n") {
    iconElement.setAttribute("class", "fa-solid fa-moon fa-beat-fade");
  } else if (icon === "02d") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-sun fa-beat-fade");
  } else if (icon === "02n") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-moon fa-beat-fade");
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    iconElement.setAttribute("class", "fa-solid fa-cloud fa-beat-fade");
  } else if (icon === "09d" || icon === "09n") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-rain fa-beat-fade");
  } else if (icon === "10d" || icon === "10n") {
    iconElement.setAttribute(
      "class",
      "fa-solid fa-cloud-showers-heavy fa-beat-fade"
    );
  } else if (icon === "11d" || icon === "11n") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-bolt fa-beat-fade");
  } else if (icon === "13d" || icon === "13n") {
    iconElement.setAttribute("class", "fa-solid fa-snowflake fa-beat-fade");
  } else {
    iconElement.setAttribute("class", "fa-solid fa-smog fa-beat-fade");
  }
}
function displayFahrenheit() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
function displayCelsius() {
  let currentTemp = document.querySelector("#current-temp");
  let celsiusTemp = (5 / 9) * fahrenheitTemp - 32;
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let fahrenheitTemp = null;
let celsiusTemp = null;

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", changeCity);

let fahrenheit = document.querySelector("#fahrenheit-button");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius-button");
celsius.addEventListener("click", displayCelsius);
