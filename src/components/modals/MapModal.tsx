import { useState, onUnmounted } from 'bromium';
import Modal from './Modal';
import { WEATHER_MAP_LAYERS, layersArray } from '@/constants/mapLayers.ts';
import { initMap, addWeatherLayer, loadLeaflet } from '@/helpers/mapInitializer.ts';
import './styles/MapModal.css';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  lat: number;
  lon: number;
  city: string;
}

let mapInstance: any = null;
let weatherLayerInstance: any = null;

export default function MapModal({ isOpen, onClose, lat, lon }: MapModalProps) {
  const selectedLayer = useState(WEATHER_MAP_LAYERS.CLOUDS.id);
  const isDropdownOpen = useState(false);

  const initializeMap = async (container: HTMLDivElement) => {
    if (!container) return;

    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
      weatherLayerInstance = null;
    }

    await loadLeaflet();

    mapInstance = initMap(window.L, container, lat, lon);
    weatherLayerInstance = addWeatherLayer(window.L, mapInstance, selectedLayer.value);

    setTimeout(() => {
      if (mapInstance) {
        mapInstance.invalidateSize();
      }
    }, 100);
  };

  const cleanupMap = () => {
    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
      weatherLayerInstance = null;
    }
  };

  onUnmounted(() => {
    cleanupMap();
  });

  if (isOpen && !mapInstance) {
    setTimeout(() => {
      const container = document.getElementById('map-container');
      if (container) {
        initializeMap(container as HTMLDivElement).then();
      }
    }, 300);
  }

  const handleLayerSelect = (layerId: string) => {
    selectedLayer.value = layerId;
    isDropdownOpen.value = false;

    if (mapInstance) {
      if (weatherLayerInstance) {
        mapInstance.removeLayer(weatherLayerInstance);
      }
      weatherLayerInstance = addWeatherLayer(window.L, mapInstance, layerId);
    }
  };

  const getSelectedLayerName = () =>
    layersArray.find((l) => l.id === selectedLayer.value)?.name ||
    WEATHER_MAP_LAYERS.CLOUDS.name;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Map">
      <div className="map-modal-content">
        <div id="map-container" className="map-container">
          <div className="map-layer-control">
            <button
              className="layer-control-button"
              onClick={() => (isDropdownOpen.value = !isDropdownOpen.value)}
            >
              <span className="layer-name">{getSelectedLayerName()}</span>
            </button>

            {isDropdownOpen.value && (
              <div className="layer-control-menu">
                {layersArray.map((layer) => (
                  <button
                    key={layer.id}
                    className={`layer-control-option ${
                      selectedLayer.value === layer.id ? 'active' : ''
                    }`}
                    onClick={() => handleLayerSelect(layer.id)}
                  >
                    {layer.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
