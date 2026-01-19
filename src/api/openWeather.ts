import { WEATHER_API_KEY, WEATHER_API_BASE } from '../constants/env';
import { getUnitsSetting } from '../store/units';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      pm2_5: number;
      pm10: number;
      o3: number;
      no2: number;
    };
  }>;
}

export async function getWeather(city: string): Promise<WeatherData | null> {
  try {
    const units = getUnitsSetting();
    const url = `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=${units}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getForecast(city: string): Promise<ForecastData | null> {
  try {
    const units = getUnitsSetting();
    const url = `${WEATHER_API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=${units}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getAirQuality(lat: number, lon: number): Promise<AirQualityData | null> {
  try {
    const url = `${WEATHER_API_BASE}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export function getWeatherMapTileUrl(layer: string, z: number, x: number, y: number): string {
  return `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${WEATHER_API_KEY}`;
}
