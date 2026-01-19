import { Link, useRoute } from 'bromium';
import './styles/TabButton.css';

interface TabButtonProps {
  to: string;
  label: string;
}

export default function TabButton({ to, label }: TabButtonProps) {
  const route = useRoute();
  const toPath = to.split('?')[0];
  const isActive = route.value.path === toPath;

  return (
    <Link to={to} className={`tab-button ${isActive ? 'active' : ''}`}>
      {label}
    </Link>
  );
}
