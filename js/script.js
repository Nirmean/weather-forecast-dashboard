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
