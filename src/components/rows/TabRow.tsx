import TabButton from '../buttons/TabButton';
import './styles/TabRow.css';

const tabs = [
  { label: 'Weather', path: '/weather' },
  { label: 'Day', path: '/day-forecast' },
  { label: 'Week', path: '/week-forecast' },
];

interface TabRowProps {
  city: string;
}

export default function TabRow({ city }: TabRowProps) {
  return (
    <div className="tab-row">
      {tabs.map((tab) => (
        <TabButton
          key={tab.path}
          to={`${tab.path}?city=${encodeURIComponent(city)}`}
          label={tab.label}
        />
      ))}
    </div>
  );
}
