import { formatTemperature } from '@/store/units.ts';
import DeleteButton from '../buttons/DeleteButton';
import './styles/LocationCard.css';

interface LocationCardProps {
  city: string;
  country: string;
  temperature: number;
  icon: any;
  units?: string;
  lastSearched?: number;
  onSelect: () => void;
  onDelete: () => void;
}

export default function LocationCard({
  city,
  country,
  temperature,
  icon,
  units,
  lastSearched,
  onSelect,
  onDelete,
}: LocationCardProps) {
  function formatDate(timestamp?: number): string {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins === 0 ? 'Just now' : `${diffMins}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    if (diffDays < 7) {
      return `${diffDays}d ago`;
    }
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  function handleDelete(event: MouseEvent) {
    event.stopPropagation();
    onDelete();
  }

  return (
    <div className="location-card">
      <div className="location-info" onClick={onSelect}>
        <div className="location-header">
          <h3 className="location-city">{city}</h3>
          <DeleteButton onClick={handleDelete} />
        </div>
        <p className="location-country">{country}</p>
        {lastSearched && <p className="location-time">{formatDate(lastSearched)}</p>}
      </div>

      <div className="location-weather" onClick={onSelect}>
        <div className="weather-icon">{icon}</div>
        <span className="weather-temperature">
          {formatTemperature(Math.round(temperature), units)}
        </span>
      </div>
    </div>
  );
}
