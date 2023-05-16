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
