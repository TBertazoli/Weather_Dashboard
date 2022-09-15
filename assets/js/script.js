var inputText = $("#cityname");
var cityWeather = $("#displaycity");


var getCityLocation = function () {
    var coordinatesApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputText.val() + "&limit=1" + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(coordinatesApi).then(function (response) {
        response.json().then(function (cities) {
            var city = cities[0];
            getWeatherReport(city);
            ;

        });
    });
}

var getWeatherReport = function (city) {
    var cityApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + city.lat + "&lon=" + city.lon + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(cityApi).then(function (response) {
        response.json().then(function (weather) {


        });
    });
}



