// console.log("hello world");
// 37f29f7631f9aec93c23685b2545c3c8
// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=37f29f7631f9aec93c23685b2545c3c8
var searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", geoLocate);
var currentWeather = document.querySelector("#current-weather");
var latitude;
var longitude;
var cityToSearch;
var currentForecast = document.querySelector("#current-forecast");
var forecastEl = document.querySelector("#forecast-blocks");

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
      showForecast(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function showAnswer(data) {
  // console.log(data);
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

function showForecast(data) {
  forecastEl.textcontent = "";
  currentForecast.classList.remove("hidden");
  for (var i = 1; i <= 5; i++) {
    console.log(data.daily[i]);
    var cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.style.width = "18rem";
    cardEl.innerHTML = ` <div class="card-body">
    <h5 class="card-title">${new Date(data.daily[i].dt * 1000).toLocaleString(
      "en-US",
      {
        weekday: "long",
      }
    )}</h5>
    <img src="https://openweathermap.org/img/w/${
      data.daily[i].weather[0].icon
    }.png" />
    <p class="card-text">${data.daily[i].temp.day}°F</p>
    <p class="card-text">${data.daily[i].wind_speed}MPH</p>
    <p class="card-text">${data.daily[i].humidity}%</p>
  </div>`;
    forecastEl.append(cardEl);
  }
}
