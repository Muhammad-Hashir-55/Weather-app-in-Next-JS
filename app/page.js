'use client';
import { useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import '../styles/globals.css';

export default function Home() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const fetchWeather = async () => {
  try {
    const weatherRes = await fetch(`/api/weather?city=${city}&unit=${unit}`);
    const weatherJson = await weatherRes.json();

    if (!weatherRes.ok) {
      setWeatherData(null);
      alert(`Weather Error: ${weatherJson.message}`);
      return;
    }

    setWeatherData(weatherJson);

    const forecastRes = await fetch(`/api/forecast?city=${city}&unit=${unit}`);
    const forecastJson = await forecastRes.json();

    if (!forecastRes.ok) {
      setForecastData([]);
      alert(`Forecast Error: ${forecastJson.message}`);
      return;
    }

    setForecastData(forecastJson);
  } catch (error) {
    alert('Something went wrong. Please try again.');
    console.error('Fetch Error:', error);
  }
};


  return (
    <main className="main">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select onChange={(e) => setUnit(e.target.value)} value={unit}>
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
        <option value="standard">K</option>
      </select>
      <button onClick={fetchWeather}>Get Weather</button>

      {weatherData && <WeatherCard data={weatherData} unit={unit} />}
      {forecastData.length > 0 && <ForecastCard data={forecastData} unit={unit} />}
    </main>
  );
}
