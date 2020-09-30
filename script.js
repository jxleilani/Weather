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
        queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
        "&lat=" + lat + "&lon=" + long;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          city.textContent = response.name;
          $("#icon").html('<img src="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png">');
          $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
          $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
          $("#weather").text(response.weather[0].description.toUpperCase());
          $("#humidity").text(response.main.humidity);
          $("#windspeed").text(Math.floor(response.wind.speed * 2.237));
        });
        //UV Index
        $.ajax({
          url: queryUV,
          method: "GET"
        }).then(function(response){
          $("#uvindex").text(response.value); 
        });
        //7 Day Forecast
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=95d5fa275b00b66c86cd3920c0de76f3",
          method: "GET"
        }).then(function(response){
          for(var i=1; i<=8; i++){
            $("#slide"+i+" #sliderDate").text(new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US"));
            $("#slide"+i+" #sliderIcon").html('<img src="https://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png">');
            $("#slide"+i+" #high").text(Math.floor((response.daily[i].temp.max -273.15) * 1.8 +32));
            $("#slide"+i+" #low").text(Math.floor((response.daily[i].temp.min -273.15) * 1.8 +32));
          }
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
  $(".nav").toggleClass("nav-active");

  var cityname = $("#searchtext").val();

  searches.push(cityname);
  storeSearches();
  renderSearches();

  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    city.textContent = response.name;
    $("#icon").html('<img src="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png">');
    $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
    $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
    $("#weather").text(response.weather[0].description.toUpperCase());
    $("#humidity").text(response.main.humidity);
    $("#windspeed").text(Math.floor(response.wind.speed * 2.237));

    lat = response.coord.lat;
    long = response.coord.lon;
    queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
    "&lat=" + lat + "&lon=" + long;
    //UV Index Search
    $.ajax({
      url: queryUV,
      method: "GET"
    }).then(function(response){
      $("#uvindex").text(response.value); 
    });
    //7 Day Forecast Search
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=95d5fa275b00b66c86cd3920c0de76f3",
      method: "GET"
    }).then(function(response){
      for(var i=1; i<=8; i++){
        $("#slide"+i+" #sliderIcon").html('<img src="https://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png">');
        $("#slide"+i+" #high").text(Math.floor((response.daily[i].temp.max -273.15) * 1.8 +32));
        $("#slide"+i+" #low").text(Math.floor((response.daily[i].temp.min -273.15) * 1.8 +32));
      }
    });
  });
});

// Or hit enter key
$("#searchtext").keypress(function(e){
  if (e.which == 13){
  $(".nav").toggleClass("nav-active");

  var cityname = $("#searchtext").val();

  searches.push(cityname);
  storeSearches();
  renderSearches();

  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    city.textContent = response.name;
    $("#icon").html('<img src="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png">');
    $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
    $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
    $("#weather").text(response.weather[0].description.toUpperCase());
    $("#humidity").text(response.main.humidity);
    $("#windspeed").text(Math.floor(response.wind.speed * 2.237));

    lat = response.coord.lat;
    long = response.coord.lon;
    queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
    "&lat=" + lat + "&lon=" + long;
    //UV Index Search
    $.ajax({
      url: queryUV,
      method: "GET"
    }).then(function(response){
      $("#uvindex").text(response.value); 
    });
    //7 Day Forecast Search
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=95d5fa275b00b66c86cd3920c0de76f3",
      method: "GET"
    }).then(function(response){
      for(var i=1; i<=8; i++){
        $("#slide"+i+" #sliderIcon").html('<img src="https://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png">');
        $("#slide"+i+" #high").text(Math.floor((response.daily[i].temp.max -273.15) * 1.8 +32));
        $("#slide"+i+" #low").text(Math.floor((response.daily[i].temp.min -273.15) * 1.8 +32));
      }
    });
  });
}
});
/* End Search Weather */

/* Previous Search Weather*/
$(document).on("click", ".atag", function(){
  var cityname = $(this).text();

  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    city.textContent = response.name;
    $("#icon").html('<img src="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png">');
    $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
    $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
    $("#weather").text(response.weather[0].description.toUpperCase());
    $("#humidity").text(response.main.humidity);
    $("#windspeed").text(Math.floor(response.wind.speed * 2.237));

    lat = response.coord.lat;
    long = response.coord.lon;
    queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
    "&lat=" + lat + "&lon=" + long;
    //UV Index Search
    $.ajax({
      url: queryUV,
      method: "GET"
    }).then(function(response){
      $("#uvindex").text(response.value); 
    });
    //7 Day Forecast Search
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=95d5fa275b00b66c86cd3920c0de76f3",
      method: "GET"
    }).then(function(response){
      for(var i=1; i<=8; i++){
        $("#slide"+i+" #sliderIcon").html('<img src="https://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png">');
        $("#slide"+i+" #high").text(Math.floor((response.daily[i].temp.max -273.15) * 1.8 +32));
        $("#slide"+i+" #low").text(Math.floor((response.daily[i].temp.min -273.15) * 1.8 +32));
      }
    });
  });
  $(".nav").toggleClass("nav-active");
});
/* End Previous Search Weather */

/* Local Storage*/
var searches = [];
function renderSearches(){
  $(".search-list").html("");
  for(var i=0; i<searches.length; i++){
    var search = searches[i];
    $(".search-list").append($("<li>").attr("class", "link").append($("<a>").attr("class", "atag").text(search)));
  }
}
function storeSearches(){
  localStorage.setItem("searches", JSON.stringify(searches));
}
function init(){
  var storedSearch = JSON.parse(localStorage.getItem("searches"));
  if(storedSearch !== null){
    searches = storedSearch;
  }
  renderSearches();
}
init();
/* End Local Storage */

/* Nav Transition*/
  $(".burger").on("click", ()=>{
      $(".nav").toggleClass("nav-active");
  });

