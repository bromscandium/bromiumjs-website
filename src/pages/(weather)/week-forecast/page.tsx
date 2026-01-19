import { useState, onMounted, useRoute, useRouter } from 'bromium';
import { getForecast, ForecastData } from '@/api/openWeather.ts';
import ForecastSection from '../../../components/sections/ForecastSection.tsx';
import '@/pages/(weather)/weather/style.css';

export default function WeekForecast() {
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
      const grouped: Record<string, ForecastData['list']> = {};

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
      });

      const dailyForecasts = Object.keys(grouped).map((date) =>
        grouped[date].reduce((prev, curr) => {
          const prevHour = new Date(prev.dt * 1000).getHours();
          const currHour = new Date(curr.dt * 1000).getHours();
          return Math.abs(currHour - 12) < Math.abs(prevHour - 12)
            ? curr
            : prev;
        })
      );

      forecastData.value = dailyForecasts.slice(0, 7);
    }

    isLoading.value = false;
  }

  onMounted(() => {
    loadForecast();
  });

  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading.value) {
    return <div className="forecast-loading">Loading...</div>;
  }

  return (
    <ForecastSection
      forecastData={forecastData.value}
      city={city.value}
      formatLabel={formatDay}
    />
  );
}
