// console.log("hello world");
// 37f29f7631f9aec93c23685b2545c3c8
// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=37f29f7631f9aec93c23685b2545c3c8

var latitude;
var longitude;

//geolocation call
fetch(
  "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=37f29f7631f9aec93c23685b2545c3c8"
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data[0]);
    latitude = data[0].lat;
    console.log(latitude);
    longitude = data[0].lon;
    console.log(longitude);
    weatherCall(latitude, longitude);
  })
  .catch(function (err) {
    console.error(err);
  });

function weatherCall(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=37f29f7631f9aec93c23685b2545c3c8`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}
