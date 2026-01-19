import {getOSMTileUrl} from '../api/openStreet';
import {getWeatherMapTileUrl} from '../api/openWeather';

declare global {
  interface Window {
    L: any;
  }
}

export const initMap = (L: any, container: HTMLElement, lat: number, lon: number) => {
  const map = L.map(container, {
    center: [lat, lon],
    zoom: 10,
    zoomControl: true,
  });

  L.tileLayer(getOSMTileUrl('{z}', '{x}', '{y}'), {
    maxZoom: 19,
  }).addTo(map);
  return map;
};

export const addWeatherLayer = (L: any, map: any, layerId: string) => {
  return L.tileLayer(getWeatherMapTileUrl(layerId, '{z}' as any, '{x}' as any, '{y}' as any), {
    opacity: 0.7,
  }).addTo(map);
};

export const loadLeaflet = async () => {
  if (!window.L) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

    await new Promise((resolve) => {
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
};
