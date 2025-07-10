export default function ForecastCard({ data, unit }) {
  const symbol = unit === 'metric' ? '°C' : unit === 'imperial' ? '°F' : 'K';

  // Show one forecast per day (every 8th entry in 3-hour interval data)
  const dailyData = data.filter((_, i) => i % 8 === 0);

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyData.map((item, i) => (
          <div key={i} className="forecast-card">
            <p><strong>{item.dt_txt.split(' ')[0]}</strong></p>
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="icon" />
            <p>{item.main.temp}{symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
