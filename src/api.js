export async function getWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,weather_code`,
    );
    if (!response.ok) {
      throw new Error(`Request Error: ${response.status}`);
    }
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    alert(`Erro na requisição: ${error.message}`);
    console.log("Request Error: ", error);
    return null;
  }
}
