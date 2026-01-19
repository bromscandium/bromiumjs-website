import { getUnitsSetting } from '@/store/units.ts';
import './styles/TemperatureInfo.css';

interface TemperatureInfoProps {
  temperature: number;
  realFeel: number;
  iconUrl: string;
}

export default function TemperatureInfo({ temperature, realFeel, iconUrl }: TemperatureInfoProps) {
  const units = getUnitsSetting();
  const unitSymbol = units === 'imperial' ? '°F' : '°C';

  return (
    <div className="temperature-info">
      <div className="weather-icon-large">
        <img src={iconUrl} alt="Weather icon" className="weather-icon-img" />
      </div>
      <div className="temperature-display">
        <span className="temperature-value">
          {temperature}
          {unitSymbol}
        </span>
        <span className="real-feel">
          RealFeel: {realFeel}
          {unitSymbol}
        </span>
      </div>
    </div>
  );
}
