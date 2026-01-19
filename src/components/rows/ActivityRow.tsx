import './styles/ActivityRow.css';

interface ActivityRowProps {
  icon: string;
  name: string;
  value: string;
  quality: string;
}

export default function ActivityRow({ icon, name, value, quality }: ActivityRowProps) {
  const baseUrl = import.meta.env.BASE_URL;

  const getQualityClass = (quality: string) => {
    if (quality === 'Good' || quality === 'Low') return 'quality-good';
    if (quality === 'Moderate') return 'quality-moderate';
    return 'quality-bad';
  };

  return (
    <div className="activity-row">
      <div className="activity-icon">
        <img src={`${baseUrl}icons/activities/${icon}.svg`} alt={name} />
      </div>
      <div className="activity-content">
        <span className="activity-name">{name}:</span>
        <span className={`activity-value ${getQualityClass(quality)}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
