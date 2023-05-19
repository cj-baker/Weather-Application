function getLocalTemp() {
  navigator.geolocation.getCurrentPosition(showPosition);
  navigator.geolocation.getCurrentPosition(getLocalForecast);
}
function getLocalForecast(position) {
  console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "ef8b3fdo4bbe83bb3e23006at2b0a458";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(displayForecast);
  console.log(apiUrl);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "1098686bcbb41f221c2aec962bdfe6fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let wind = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = `${temperature}°F`;
  document.querySelector("#current-location").innerHTML = `${city}`;
  document.querySelector("#current-high").innerHTML = `H: ${high}°`;
  document.querySelector("#current-low").innerHTML = `L: ${low}°`;
  document.querySelector("#wind-speed").innerHTML = `Wind: ${wind} mph`;
  document.querySelector("#weather-condition").innerHTML = `${condition}`;
  updateIcon(response);
  resetRadioButton();
}

function searchCity(city) {
  let apiKey = "1098686bcbb41f221c2aec962bdfe6fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  searchCityForecast(city);
  resetRadioButton();
}

function searchCityForecast(city) {
  let apiKey = "ef8b3fdo4bbe83bb3e23006at2b0a458";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<h2><div class="row">`;
  let days = ["SUN", "MON", "TUES", "WED", "THU", "FRI"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
                <div class="forcast-day">${day}</div>
                <div class="forecast-icons">
                  <i
                    class="fa-solid fa-cloud-showers-heavy"
                    style="color: #ffffff"
                  ></i>
                </div>
                <div class="forecast-temperatures">51° | 42°</div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div></h2>`;
  forecast.innerHTML = forecastHTML;
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
function resetRadioButton() {
  let radioButton = document.getElementById("btnradio1");
  radioButton.checked = true;
}

let fahrenheitTemp = null;

let celsiusTemp = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCity);

let fahrenheit = document.querySelector("#fahrenheit-button");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius-button");
celsius.addEventListener("click", displayCelsius);

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

searchCity("Vancouver");
