// console.log("hello world");
// 37f29f7631f9aec93c23685b2545c3c8
// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=37f29f7631f9aec93c23685b2545c3c8
var searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", geoLocate);
var currentWeather = document.querySelector("#current-weather");
var latitude;
var longitude;
var cityToSearch;

//geolocation call
function geoLocate(e) {
  e.preventDefault();
  var citySearch = document.querySelector("#query").value;

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=5&appid=37f29f7631f9aec93c23685b2545c3c8`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      cityToSearch = data[0].name;
      latitude = data[0].lat;
      longitude = data[0].lon;
      weatherCall(latitude, longitude);
    })
    .catch(function (err) {
      console.error(err);
    });
  4;
}

function weatherCall(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=37f29f7631f9aec93c23685b2545c3c8`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      showAnswer(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function showAnswer(data) {
  console.log(data);
  currentWeather.innerHTML = "";

  var cityTitle = document.createElement("h2");
  cityTitle.innerText = `${cityToSearch} (Today's Date)`;
  currentWeather.appendChild(cityTitle);

  var tempEl = document.createElement("p");
  tempEl.innerText = `${data.current.temp} °F `;
  currentWeather.appendChild(tempEl);

  var windEl = document.createElement("p");
  windEl.innerText = `${data.current.wind_speed} MPH `;
  currentWeather.appendChild(windEl);

  var humidityEl = document.createElement("p");
  humidityEl.innerText = `${data.current.humidity} % `;
  currentWeather.appendChild(humidityEl);

  var uvIdEl = document.createElement("p");
  uvIdEl.innerText = `${data.current.uvi} `;
  currentWeather.appendChild(uvIdEl);
}
