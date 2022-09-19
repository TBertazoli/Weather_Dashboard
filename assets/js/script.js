var inputText = $("#inputtext");
var cityWeather = $("#displaycity");
var date = moment().format("MM/DD/YYYY");


var getCityLocation = function () {
    var coordinatesApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputText.val() + "&limit=1" + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(coordinatesApi).then(function (response) {
        response.json().then(function (cities) {
            var city = cities[0];
            getWeatherReport(city);
            displayFiveDayForecast(city);
        });
    });
}

var getWeatherReport = function (city) {
    var cityApi = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + city.lat + "&lon=" + city.lon + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(cityApi).then(function (response) {
        response.json().then(function (data) {
            $("#cityname").text(data.name);
            $("#date").text(date);
            $("#temperature").text("Temp: " + data.main.temp + "℉");
            $("#wind").text("Wind: " + data.wind.speed + "MPH");
            $("#humidity").text("Humidity: " + data.main.humidity + "%");
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        });
    });
};

var displayFiveDayForecast = function (city) {
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&cnt=5&lat=" + city.lat + "&lon=" + city.lon + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(fiveDayApi).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            $("#fivedayforecast").text("5-Day Forecast:");
            for (var i = 0; i < data.list.length; i++) {
                console.log(data.list);
                $('#day' + i + 'temp').text("Temp: " + data.list[i].main.temp + "℉");
                $('#day' + i + 'wind').text('Wind: ' + data.list[i].wind.speed + 'MPH');
                $('#day' + i + 'humidity').text("Humidity: " + data.list[i].main.humidity + "%");
                $('#day' + i + 'icon').attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
            }

        });
    });
}


