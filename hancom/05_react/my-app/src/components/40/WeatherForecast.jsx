import {useState, useEffect } from "react";

function getWeatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
   return "🌡️";
}

function getHeatWarning(maxTemp) {
    if (maxTemp >=35) return {label: "폭염경보", level: "danger"};
    if (maxTemp >=33) return {label: "폭염주의보", level: "warning"};
    return null;
}

export default function WeatherForecast() {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
   
 useEffect(()=> {
    async function loadWeather() {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSeoul&forecast_days=14";

        const res= await fetch(url);
        const data=await res.json();

        const days = data.daily.time.map((dateStr, i)=> ({
            date: new Date(dateStr),
            code: data.daily.weathercode[i],
            max: data.daily.temperature_2m_max[i],
            min: data.daily.temperature_2m_min[i],
            rain: data.daily.precipitation_probability_max[i],
        }));

        setForecast(days);
        setLoading(false);
    }
    loadWeather();
        
    }, []);
    if (loading) {
        return <div className="loading">불러오는중...</div>
        
    }
    
    return (
        <div className="weather-page">
            <h1 className="weather-title">서울 날씨</h1>
            <p className="weather-subtitle">오늘부터 14일간 실제 예보</p>

        <div className="weather-grid">
            {forecast.map((day, i)=> {
                const warning = getHeatWarning(day.max);

                return(
                    <div className="weather-card" key={i}>
                        <div className="weather-date">
                            {i === 0 ? "오늘" : `${day.date.getMonth() + 1}.${day.date.getDate()}`}
            </div>

            <div className="weather-emoji">{getWeatherEmoji(day.code)}</div>
            <div className="weather-temp">
                {Math.round(day.max)}°{" "}
                <span className="weather-temp-min">{Math.round(day.min)}°</span>
            </div>
            <div className="weather-rain">💧{day.rain}%</div>

    
     {warning && (
                <div className={`weather-badge weather-badge--${warning.level}`}>
                  {warning.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}