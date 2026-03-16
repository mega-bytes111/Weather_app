const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

const icon = document.getElementById("weather-icon");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function getData(city) {

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=63ed69e7d9ea47eca8a192543261603&q=${city}&aqi=yes`);
    const data = await response.json();

    return data;
}

async function showWeather(){

    const value = input.value;

    if(value === ""){
        alert("Please enter city name");
        return;
    }

    try{

        const result = await getData(value);

        cityName.innerText = `${result.location.name}, ${result.location.country}`;

        cityTime.innerText = "Local Time: " + result.location.localtime;

        cityTemp.innerText = `🌡 Temperature: ${result.current.temp_c} °C`;

        feelsLike.innerText = `🤔 Feels Like: ${result.current.feelslike_c} °C`;

        humidity.innerText = `💧 Humidity: ${result.current.humidity}%`;

        wind.innerText = `💨 Wind Speed: ${result.current.wind_kph} km/h`;

        icon.src = "https:" + result.current.condition.icon;

        changeBackground(result.current.is_day);

    }
    catch(err){
        alert("City not found");
    }

}

function changeBackground(isDay){

    if(isDay === 1){
        document.body.style.background =
        "linear-gradient(135deg,#5f9cff,#6be0ff)";
    }
    else{
        document.body.style.background =
        "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
    }

}

button.addEventListener("click", showWeather);

input.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        showWeather();
    }
});