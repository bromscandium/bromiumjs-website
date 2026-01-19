import { useState, onMounted, useRoute, useRouter } from 'bromium';
import { getForecast, ForecastData } from '@/api/openWeather.ts';
import { getTimeFormatSetting } from '@/store/timeFormats.ts';
import ForecastSection from '../../../components/sections/ForecastSection.tsx';
import '@/pages/(weather)/weather/style.css';

export default function DayForecast() {
  const route = useRoute();
  const router = useRouter();

  const forecastData = useState<ForecastData['list']>([]);
  const city = useState('');
  const isLoading = useState(true);

  async function loadForecast() {
    const cityParam = route.value.query.city as string;
    if (!cityParam) {
      await router.push('/');
      return;
    }

    city.value = cityParam;
    isLoading.value = true;

    const data = await getForecast(cityParam);

    if (data?.list) {
      forecastData.value = data.list.slice(0, 8);
    }

    isLoading.value = false;
  }

  onMounted(() => {
    loadForecast();
  });

  const formatTime = (timestamp: number) => {
    const timeFormat = getTimeFormatSetting();
    const date = new Date(timestamp * 1000);

    if (timeFormat === '24h') {
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  if (isLoading.value) {
    return <div className="forecast-loading">Loading...</div>;
  }

  return (
    <ForecastSection
      forecastData={forecastData.value}
      city={city.value}
      formatLabel={formatTime}
    />
  );
}
