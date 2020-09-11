/* Display Current Date */
var todayDay = document.getElementById("today-day");
var todayDate = document.getElementById("today-date");

var formatDay = moment().format('dddd');
var formatDate = moment().format('MMMM Do YYYY');

function updateDay(){
    todayDay.textContent = formatDay;
    todayDate.textContent = formatDate;
}
updateDay();
/* End Display Current Date */

var APIKey = "95d5fa275b00b66c86cd3920c0de76f3";
var queryURL = "";
var queryUV ="";

var city = document.getElementById("city");
var long = 0;
var lat = 0;

/* Current Location Weather */
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>{
        lat = position.coords.latitude; 
        long = position.coords.longitude;

        queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat + "&lon=" + long + "&appid=" + APIKey;
        queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
        "&lat=" + lat + "&lon=" + long;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
          city.textContent = response.name;
          $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
          $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
          $("#weather").text(response.weather[0].description.toUpperCase());
          $("#humidity").text(response.main.humidity);
          $("#windspeed").text(Math.floor(response.wind.speed * 2.237));
        });

        $.ajax({
          url: queryUV,
          method: "GET"
        }).then(function(response){
          $("#uvindex").text(response.value); 
        });

      });
    } else { 
      city.innerHTML = "Geolocation not supported by this browser.";
    }
  }

getLocation();
/* End Current Location Weather */

/* Search Weather */
$("#search").on("click", function(){
  var cityname = $("#searchtext").val();
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    city.textContent = response.name;
    $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
    $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
    $("#weather").text(response.weather[0].description.toUpperCase());
    $("#humidity").text(response.main.humidity);
    $("#windspeed").text(Math.floor(response.wind.speed * 2.237));

    lat = response.coord.lat;
    long = response.coord.lon;

    queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
    "&lat=" + lat + "&lon=" + long;

    $.ajax({
      url: queryUV,
      method: "GET"
    }).then(function(response){
      $("#uvindex").text(response.value); 
    });
  });


});
/* End Search Weather */