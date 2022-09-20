var inputText = $("#inputtext");
var cityWeather = $("#displaycity");
var todaysDate = moment().format("(MM/DD/YYYY)");
var cityHistory = [];

$(document).ready(() => {
    populateHistory();

});

//function to get the geocordinates
var getCityLocation = function (cityName) {
    console.log(cityName);
    var coordinatesApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputText.val() + "&limit=1" + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(coordinatesApi).then(function (response) {
        response.json().then(function (cities) {
            var city = cities[0];
            getWeatherReport(city);
            displayFiveDayForecast(city);
        });
    });
}

//function to display today's temperature
var getWeatherReport = function (city) {
    var cityApi = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + city.lat + "&lon=" + city.lon + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(cityApi).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            $("#cityname").text(data.name);
            //set local storage
            cityHistory.push(data.name);
            localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
            displayCityHistory();
            $("#date").text(todaysDate);
            $("#temperature").text("Temp: " + data.main.temp + "℉");
            $("#wind").text("Wind: " + data.wind.speed + "MPH");
            $("#humidity").text("Humidity: " + data.main.humidity + "%");
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        });
    });
};

//function to display five day forecast
var displayFiveDayForecast = function (city) {
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&cnt=5&lat=" + city.lat + "&lon=" + city.lon + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(fiveDayApi).then(function (response) {
        response.json().then(function (data) {
            $("#fivedayforecast").text("5-Day Forecast:");
            for (var i = 0; i < data.list.length; i++) {
                var incrementDate = moment().add(i + 1, 'd').format("MM/DD/YYYY");
                $('#day' + i).text(incrementDate);
                $('#day' + i + 'temp').text("Temp: " + data.list[i].main.temp + "℉");
                $('#day' + i + 'wind').text('Wind: ' + data.list[i].wind.speed + 'MPH');
                $('#day' + i + 'humidity').text("Humidity: " + data.list[i].main.humidity + "%");
                $('#day' + i + 'icon').attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
            }
        });
    });
}

var populateHistory = function () {
    cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    console.log(cityHistory);
    displayCityHistory();
}


var displayCityHistory = function () {
    $('#storecitysearch').empty();
    for (var i = 0; i < cityHistory.length; i++) {
        console.log(cityHistory[i]);
        
        var createElement = $("<button type='submit' class='btn' onclick='searchFromHistory(\"" + cityHistory[i] +"\")'></button>").text(cityHistory[i]);
        $('#storecitysearch').append(createElement);
    }
}

var searchFromHistory = function(cityName) {
    inputText.val(cityName);
    getCityLocation();
}