// API KEY variable
const API_KEY = "63b28c6e37c471cac653534f235a28e0";

/*
- "submit" function to initiate the api calls when the button is clicked
- take value from input
- save to localstorage
- used in API call for coordinates
*/
$("#search-button").on("click", async function (event) {

    event.preventDefault();
    let cityInput = $("#search-input").val();
    localStorage.setItem("name", cityInput);

    let latLon = await getLocation(cityInput);
    currentWeather(latLon);

});


// function to obtain city coordinates
async function getLocation(city) {
    let locURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit&appid=${API_KEY}`;
    let locationResponse = await fetch(locURL);
    let locationData = await locationResponse.json();
    console.log(locationData);

    return {
        lat: locationData[0].lat,
        lon: locationData[0].lon,
    };
}

// function to obtain current weather data based on city coordinates
// function to obtain 5 day weather forecast
//    - use coordinates from previous

async function currentWeather(coordinates) {
    let weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
    let weatherResponse = await fetch(weatherLink);
    let weatherData = await weatherResponse.json();
    console.log(weatherData);

    // display the current weather
    let currentWeatherSection = $("#today");
    currentWeatherSection.empty();

    let cityName = $("<h2>").text(weatherData.name);
    let date = $("<p>").text(dayjs().format("MMMM D, YYYY"));
    let icon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
    let temperature = $("<p>").text(`Temperature: ${weatherData.main.temp} °C`);
    let windSpeed = $("<p>").text(`Wind Speed: ${weatherData.wind.speed} m/s`);
    let humidity = $("<p>").text(`Humidity: ${weatherData.main.humidity}%`);

    currentWeatherSection.append(cityName, date, icon, temperature, windSpeed, humidity);

    // Display 5-day forecast
    
    let forecastLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly&appid=${API_KEY}`;
    let forecastResponse = await fetch(forecastLink);
    let forecastData = await forecastResponse.json();
    console.log(forecastData);

    let forecastSection = $("#forecast");
    forecastSection.empty();

    for (let i = 7; i <= 40; i+= 8) {
        let forecastDate = dayjs.unix(forecastData.list[i].dt).format("MMMM D, YYYY");
        let forecastIcon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}.png`);
        let forecastTemperature = $("<p>").text(`Temperature: ${forecastData.list[i].main.temp} °C`);
        let forecastHumidity = $("<p>").text(`Humidity: ${forecastData.list[i].main.humidity}%`);

        let forecastDay = $("<div>").addClass("col-md-2 forecast-day").append(forecastDate, forecastIcon, forecastTemperature, forecastHumidity);
        forecastSection.append(forecastDay);
    }
}
