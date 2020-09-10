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

var city = document.getElementById("city");
var long = 0;
var lat = 0;

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>{
        lat = position.coords.latitude; 
        long = position.coords.longitude;

        queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat + "&lon=" + long + "&appid=" + APIKey;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
          city.textContent = response.name;
          $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.8 + 32));
          $("#feelslike").text(Math.floor((response.main.feels_like - 273.15) * 1.8 + 32));
          $("#weather").text(response.weather[0].description.toUpperCase());
      });

      });
    } else { 
      city.innerHTML = "Geolocation is not supported by this browser.";
    }


  }
  

getLocation();


