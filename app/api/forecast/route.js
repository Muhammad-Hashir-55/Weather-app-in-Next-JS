import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const unit = searchParams.get('unit');

  const unitParam = unit !== 'standard' ? `&units=${unit}` : '';

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=55f8fe254c1201cfc7bb7e50e0ce3e76${unitParam}`
    );
    return new Response(JSON.stringify(res.data.list), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Unknown Error';

    console.error('Forecast API error:', message);
    return new Response(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
