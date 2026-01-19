import { useRouter } from 'bromium';
import { getWeatherIcon } from '@/helpers/weatherIcon.ts';
import { getUnitsSetting, getWindSpeedUnit } from '@/store/units.ts';
import './styles/ForecastCard.css';

interface ForecastCardProps {
  city: string;
  temp: number;
  icon: string;
  time: string;
  realFeel: number;
  wind: number;
  humidity: number;
  timestamp: number;
}

export default function ForecastCard({
  city,
  temp,
  icon,
  time,
  realFeel,
  wind,
  humidity,
  timestamp,
}: ForecastCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/weather?city=${encodeURIComponent(city)}&timestamp=${timestamp}`).then();
  };

  return (
    <div className="forecast-card" onClick={handleClick}>
      <div className="forecast-time">{time}</div>
      <img
        className="forecast-icon"
        src={getWeatherIcon(icon)}
        alt="weather icon"
      />
      <div className="forecast-temp">{Math.round(temp)}°</div>

      <div className="forecast-details">
        <div className="forecast-detail">
          <span className="forecast-label">RealFeel:</span>
          <span className="forecast-value">{realFeel}°</span>
        </div>
        <div className="forecast-detail">
          <span className="forecast-label">Wind:</span>
          <span className="forecast-value">
            {wind} {getWindSpeedUnit(getUnitsSetting())}
          </span>
        </div>
        <div className="forecast-detail">
          <span className="forecast-label">Humidity:</span>
          <span className="forecast-value">{humidity}%</span>
        </div>
      </div>
    </div>
  );
}
