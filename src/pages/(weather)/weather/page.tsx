import { useState, onMounted, useRoute, useRouter } from 'bromium';
import { getWeather, getForecast, getAirQuality, WeatherData } from '@/api/openWeather.ts';
import { getWeatherIcon } from '@/helpers/weatherIcon.ts';
import { getWeatherTips } from '@/helpers/weatherTips.ts';
import { getAirQualityText } from '@/helpers/airQuality.ts';
import { getUnitsSetting, getWindSpeedUnit } from '@/store/units.ts';
import TemperatureInfo from '@/components/infos/TemperatureInfo.tsx';
import WeatherInfo from '@/components/infos/WeatherInfo.tsx';
import WeatherTipRow from '@/components/rows/WeatherTipRow.tsx';
import ModalRow from '@/components/rows/ModalRow.tsx';
import ActivitiesModal from '@/components/modals/ActivitiesModal.tsx';
import MapModal from '@/components/modals/MapModal.tsx';
import './style.css';

export default function Weather() {
  const route = useRoute();
  const router = useRouter();

  const weatherData = useState<WeatherData | null>(null);
  const airQualityData = useState<{ aqi: number; text: string } | null>(null);
  const isLoading = useState(true);
  const error = useState<string | null>(null);
  const isDetailsOpen = useState(false);
  const isMapOpen = useState(false);
  const latLon = useState<{ lat: number; lon: number }>({ lat: 0, lon: 0 });
  const weatherTip = useState<string[] | null>(null);

  const units = getUnitsSetting();

  async function loadWeatherData() {
    const city = route.value.query.city as string;
    const timestamp = route.value.query.timestamp as string;

    if (!city) {
      await router.push('/');
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      let data: WeatherData | null;
      let lat: number;
      let lon: number;

      if (timestamp) {
        const forecastData = await getForecast(city);
        if (!forecastData) {
          error.value = 'Failed to fetch forecast data';
          return;
        }

        const targetData = forecastData.list.find(
          (item) => item.dt === parseInt(timestamp)
        );

        if (!targetData) {
          error.value = 'Weather data not found';
          return;
        }

        data = {
          ...targetData,
          name: forecastData.city.name,
          coord: { lat: 0, lon: 0 },
          sys: { country: forecastData.city.country, sunrise: 0, sunset: 0 },
        } as unknown as WeatherData;

        const currentWeather = await getWeather(city);
        if (currentWeather) {
          lat = currentWeather.coord.lat;
          lon = currentWeather.coord.lon;
        } else {
          lat = 0;
          lon = 0;
        }
      } else {
        data = await getWeather(city);
        if (!data) {
          error.value = 'Failed to fetch weather data';
          return;
        }

        lat = data.coord.lat;
        lon = data.coord.lon;
      }

      weatherData.value = data;
      latLon.value = { lat, lon };
      weatherTip.value = getWeatherTips(data, units);

      const aqi = await getAirQuality(lat, lon);
      if (aqi) {
        const aqiValue = aqi.list[0]?.main.aqi || 0;
        airQualityData.value = { aqi: aqiValue, text: getAirQualityText(aqiValue) };
      }
    } catch {
      error.value = 'Something went wrong';
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadWeatherData();
  });

  if (isLoading.value) {
    return <div className="weather-container">Loading...</div>;
  }

  if (error.value || !weatherData.value) {
    return (
      <div className="weather-container">{error.value || 'No data available'}</div>
    );
  }

  return (
    <div className="weather-container">
      <div className="weather-top-row">
        <TemperatureInfo
          temperature={Math.round(weatherData.value.main.temp)}
          realFeel={Math.round(weatherData.value.main.feels_like)}
          iconUrl={getWeatherIcon(weatherData.value.weather[0].icon)}
        />
        <WeatherInfo
          wind={Math.round(weatherData.value.wind.speed * 3.6)}
          windUnit={getWindSpeedUnit(units)}
          humidity={weatherData.value.main.humidity}
          airQuality={airQualityData.value?.text || 'N/A'}
        />
      </div>

      <WeatherTipRow tip={weatherTip.value || []} />

      <ModalRow
        onDetailsClick={() => (isDetailsOpen.value = true)}
        onMapClick={() => (isMapOpen.value = true)}
      />

      <ActivitiesModal
        isOpen={isDetailsOpen.value}
        onClose={() => (isDetailsOpen.value = false)}
        weatherData={weatherData.value}
        aqi={airQualityData.value?.aqi || null}
      />

      <MapModal
        isOpen={isMapOpen.value}
        onClose={() => (isMapOpen.value = false)}
        lat={latLon.value.lat}
        lon={latLon.value.lon}
        city={route.value.query.city as string}
      />
    </div>
  );
}
