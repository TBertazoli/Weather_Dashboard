var inputText = $("#cityname");
var cityWeather = $("#displaycity");


var getCityLocation = function () {
    var coordinatesApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputText.val() + "&limit=1" + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(coordinatesApi).then(function (response) {
        response.json().then(function (cities) {
            var city = cities[0];
            getWeatherReport(city);
            
        });
    });
};

var getWeatherReport = function (city) {
    var cityApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + city.lat + "&lon=" + city.lon + "&appid=4b10fa1681c38a96d7bd9c68c024b6a4";
    fetch(cityApi).then(function (response) {
        response.json().then(function(weather){
            console.log(weather);
        }); 
    });
};
// 



//             {
//                 displayWeather(city, weather);
//             });
//         } else {
//             alert("Error: Location Not Found");
//         }
//     })
//         .catch(function (error) {
//             alert("Unable to connect to find the location");
//         });
//         console.log(getCityLocation);
// }

// var displayWeather = function ()



// var displayWeather = function (repos, searchTerm) {
//     // check if api returned any repos
//     if (repos.length === 0) {
//         displayCity.textContent = "No repositories found.";
//         return;
//     }
//     // clear old content
//     repoContainerEl.textContent = "";
//     repoSearchTerm.textContent = searchTerm;
//     // loop over repos
//     for (var i = 0; i < repos.length; i++) {
//         // format repo name
//         var repoName = repos[i].owner.login + "/" + repos[i].name;

//         // create a container for each repo
//         var repoEl = document.createElement("div");
//         repoEl.classList = "list-item flex-row justify-space-between align-center";

//         // create a span element to hold repository name
//         var titleEl = document.createElement("span");
//         titleEl.textContent = repoName;

//         // append to container
//         repoEl.appendChild(titleEl);

//         // create a status element
//         var statusEl = document.createElement("span");
//         statusEl.classList = "flex-row align-center";

//         // check if current repo has issues or not
//         if (repos[i].open_issues_count > 0) {
//             statusEl.innerHTML =
//                 "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//         } else {
//             statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//         }

//         // append to container
//         repoEl.appendChild(statusEl);

//         // append container to the dom
//         repoContainerEl.appendChild(repoEl);
//     }
// };


