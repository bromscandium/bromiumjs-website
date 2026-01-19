import { WeatherData } from '@/api/openWeather.ts';
import { ACTIVITY_ORDER } from '@/constants/activities.ts';
import { buildActivityData } from '@/helpers/activities.ts';
import Modal from './Modal';
import ActivityRow from '../rows/ActivityRow';
import './styles/ActivitiesModal.css';

interface ActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  weatherData: WeatherData;
  aqi: number | null;
}

export default function ActivitiesModal({
  isOpen,
  onClose,
  weatherData,
  aqi,
}: ActivitiesModalProps) {
  return (
    <Modal isOpen={isOpen} title="Activities" onClose={onClose}>
      <div className="activities-grid">
        {ACTIVITY_ORDER.map((activity) => {
          const data = buildActivityData(activity, weatherData, aqi);
          return (
            <ActivityRow
              key={activity.id}
              icon={activity.icon}
              name={activity.name}
              value={data.value}
              quality={data.quality}
            />
          );
        })}
      </div>
    </Modal>
  );
}
