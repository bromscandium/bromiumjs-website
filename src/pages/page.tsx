import { useState, onMounted, useRouter } from 'bromium';
import SearchBarInput from '../components/inputs/SearchBarInput';
import LastLocationSection from '../components/sections/LastLocationSection';
import { getWeather } from '../api/openWeather';
import {
  getSaveLocationsSetting,
  getLastLocations,
  saveLastLocation,
  deleteLastLocation,
} from '../store/locations';
import './style.css';

export default function Home() {
  const router = useRouter();
  const searchValue = useState('');
  const lastLocations = useState<any[]>([]);
  const isLoading = useState(false);
  const error = useState('');

  onMounted(() => {
    const shouldShowLocations = getSaveLocationsSetting();
    if (shouldShowLocations) {
      lastLocations.value = getLastLocations();
    }
  });

  async function handleSearch() {
    if (!searchValue.value.trim()) {
      error.value = 'Please enter a city name';
      return;
    }

    isLoading.value = true;
    error.value = '';

    try {
      const weatherData = await getWeather(searchValue.value);

      if (!weatherData) {
        error.value = 'City not found. Please try again.';
        isLoading.value = false;
        return;
      }

      const locationData = {
        id: Date.now(),
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        weatherData: weatherData,
      };

      if (getSaveLocationsSetting()) {
        saveLastLocation(locationData);
        lastLocations.value = getLastLocations();
      }

      await router.push(
        `/weather?city=${encodeURIComponent(weatherData.name)}`
      );
    } catch (err) {
      console.error('Error fetching weather:', err);
      error.value = 'Something went wrong. Please try again.';
    } finally {
      isLoading.value = false;
    }
  }

  function handleLocationSelect(location: any) {
    router.push(
      `/weather?city=${encodeURIComponent(location.city)}`
    );
  }

  function handleLocationDelete(locationId: number) {
    deleteLastLocation(locationId);
    lastLocations.value = getLastLocations();
  }

  const showLastLocations = () =>
    getSaveLocationsSetting() && lastLocations.value.length > 0;

  return (
    <div className="home-container">
      <div className="search-section">
        <h1 className="search-title">Search a city for weather...</h1>
        <SearchBarInput
          value={searchValue.value}
          onChange={(v) => (searchValue.value = v)}
          onSearch={handleSearch}
          disabled={isLoading.value}
        />
        {error.value && <p className="error-message">{error.value}</p>}
        {isLoading.value && <p className="loading-message">Searching...</p>}
      </div>

      {showLastLocations() && (
        <LastLocationSection
          locations={lastLocations.value}
          onSelect={handleLocationSelect}
          onDelete={handleLocationDelete}
        />
      )}
    </div>
  );
}
