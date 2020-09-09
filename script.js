/* Update Date */
var todayDay = document.getElementById("today-day");
var todayDate = document.getElementById("today-date");

var formatDay = moment().format('dddd');
var formatDate = moment().format('MMMM Do YYYY');

function updateDay(){
    todayDay.textContent = formatDay;
    todayDate.textContent = formatDate;
}
updateDay();
/* End Update Date */



var city = document.getElementById("city");
var long = 0;
var lat = 0;

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      city.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
function showPosition(position) {
    lat = position.coords.latitude; 
    long = position.coords.longitude;
    city.textContent = "Lat: " + lat + " Long: " + long;
}

getLocation();



var APIKey = "95d5fa275b00b66c86cd3920c0de76f3";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat + "&lon=" + long + "&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(queryURL);
    console.log(response);

});

