import { getWeather } from "./api";

const latitudeDiv = document.getElementById("latitude");
const longitudeDiv = document.getElementById("longitude");
const weatherDiv = document.getElementById("weather-div");
const form = document.getElementById("form");

/* 
Parameters ----

temperature = temperature_2m,
aparent temperature = apparent_temperature
is day or night = is_day
weather code = weather_code
Parameters ----
*/

function insertDiv(
  temperature,
  apparentTemperature,
  isDay,
  weatherCode,
  innerDiv,
) {
  const weatherDic = {
    0: { text: "Clear Sky", icon: "☀️" },
    1: { text: "Mainly Clear", icon: "🌤️" },
    2: { text: "Partly Cloudy", icon: "⛅" },
    3: { text: "Overcast", icon: "☁️" },
    45: { text: "Fog", icon: "🌫️" },
    48: { text: "Depositing Rime Fog", icon: "🌫️" },
    51: { text: "Light Drizzle", icon: "🌦️" },
    61: { text: "Slight Rain", icon: "🌧️" },
    63: { text: "Moderate Rain", icon: "🌧️" },
    71: { text: "Slight Snow Fall", icon: "❄️" },
    80: { text: "Slight Rain Showers", icon: "🌦️" },
    95: { text: "Thunderstorm", icon: "⛈️" },
  };

  const weatherInfo = weatherDic[weatherCode] || {
    text: "Unknown",
    icon: "❓",
  };
  let divStructure = `
    <div class="flex items-center justify-center w-full">
        <span class="text-6xl md:text-7xl block mb-4">${weatherInfo.icon}</span>
        <div class="flex flex-col">
            <h1 class="text-gray-400 text-1xl md:text-3xl">
              ${temperature}°C / Feels like: ${apparentTemperature}°C
            </h1>
            <h1 class="text-gray-400 text-1xl md:text-3xl">
              ${isDay ? "Day" : "Night"} / ${weatherInfo.text}
            </h1>
        </div>
    </div>`;

  return (innerDiv.innerHTML = divStructure);
}

async function initApp(latitude, longitude) {
  try {
    const data = await getWeather(latitude, longitude);
    weatherDiv.innerHTML = "";
    insertDiv(
      data.current.temperature_2m,
      data.current.apparent_temperature,
      data.current.is_day,
      data.current.weather_code,
      weatherDiv,
    );
  } catch (error) {
    alert("Request Error: ", error);
    console.log("Request Error: ", error);
    weatherDiv.innerHTML = "";
    weatherDiv.innerHTML = `<p class="text-red-500">Ops! ${error.message}</p>`;
  }
}

form.addEventListener("submit", async (event) => {
  let latitudeValue = String(latitudeDiv.value);
  let longitudeValue = String(longitudeDiv.value);
  console.log(latitudeValue);
  console.log(longitudeValue);

  event.preventDefault();
  event.target.reset();
  initApp(latitudeValue, longitudeValue);
});
