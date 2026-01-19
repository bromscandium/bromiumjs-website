import './styles/WeatherInfo.css';

interface WeatherInfoProps {
  wind: number;
  humidity: number;
  airQuality: string;
  windUnit: string;
}

export default function WeatherInfo({ wind, humidity, airQuality, windUnit }: WeatherInfoProps) {
  const getAirQualityClass = (quality: string) => {
    if (quality === 'Good') return 'quality-good';
    if (quality === 'Moderate') return 'quality-moderate';
    return 'quality-poor';
  };

  return (
    <div className="weather-info">
      <div className="info-item">
        <span className="info-label">Wind:</span>
        <span className="info-value">
          {wind} {windUnit}
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Humidity:</span>
        <span className="info-value">{humidity}%</span>
      </div>
      <div className="info-item">
        <span className="info-label">Air Quality:</span>
        <span className={`info-value ${getAirQualityClass(airQuality)}`}>
          {airQuality || 'Loading...'}
        </span>
      </div>
    </div>
  );
}
