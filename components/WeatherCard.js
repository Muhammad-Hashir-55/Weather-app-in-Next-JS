import dayjs from 'dayjs';

export default function WeatherCard({ data, unit }) {
  const temp = data.main.temp;
  const sunrise = dayjs.unix(data.sys.sunrise).format('hh:mm A');
  const sunset = dayjs.unix(data.sys.sunset).format('hh:mm A');
  const icon = data.weather[0].icon;
  const comment = temp > 30 ? "It's 🔥 hot!" : temp < 10 ? "It's 🥶 cold!" : "It's a pleasant 🌤️ day!";

  const symbol = unit === 'metric' ? '°C' : unit === 'imperial' ? '°F' : 'K';

  return (
    <div className="card">
      <h2>{data.name}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
      <p><strong>Temperature:</strong> {temp}{symbol}</p>
      <p><strong>Sunrise:</strong> {sunrise}</p>
      <p><strong>Sunset:</strong> {sunset}</p>
      <p><strong>Comment:</strong> {comment}</p>
    </div>
  );
}
