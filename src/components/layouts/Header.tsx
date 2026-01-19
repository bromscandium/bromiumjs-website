import { useRouter, useRoute, useQuery } from 'bromium';
import SettingsButton from '../buttons/SettingsButton';
import LogoButton from '../buttons/LogoButton';
import CancelButton from '../buttons/CancelButton';
import CityButton from '../buttons/CityButton';
import './styles/Header.css';

export default function Header() {
  const router = useRouter();
  const route = useRoute();
  const query = useQuery();

  const isSettings = route.value.path === '/settings';
  const city = query.value.city || '';

  function handleSettingsClick() {
    router.push('/settings').then();
  }

  function handleHomeClick() {
    router.push('/');
  }

  function handleCancelClick() {
    router.back();
  }

  return (
    <header className="header">
      <div className="header-left">
        {isSettings ? (
          <CancelButton onClick={handleCancelClick} />
        ) : (
          <SettingsButton onClick={handleSettingsClick} />
        )}
      </div>

      <div className="header-center">
        {city ? (
          <CityButton city={city} onClick={handleHomeClick} />
        ) : (
          <h1 className="header-title">
            {isSettings ? 'Settings' : 'Weather App'}
          </h1>
        )}
      </div>

      <div className="header-right">
        <LogoButton onClick={handleHomeClick} />
      </div>
    </header>
  );
}
