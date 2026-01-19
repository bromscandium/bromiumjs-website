import { useState, onMounted, onUnmounted } from 'bromium';
import LocationCard from '../cards/LocationCard';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { getWeatherIcon } from '@/helpers/weatherIcon.ts';
import './styles/LastLocationSection.css';

interface Location {
  id: number;
  city: string;
  country: string;
  temperature: number;
  weatherData: any;
  lastSearched?: number;
  savedUnits?: string;
}

interface LastLocationSectionProps {
  locations: Location[];
  onSelect: (location: Location) => void;
  onDelete: (id: number) => void;
}

export default function LastLocationSection({
  locations,
  onSelect,
  onDelete,
}: LastLocationSectionProps) {
  const currentIndex = useState(0);
  const itemsPerView = useState(3);
  const iconSize = useState(24);
  const canScrollLeft = useState(false);
  const canScrollRight = useState(true);

  const updateItemsPerView = () => {
    if (window.innerWidth <= 768) {
      itemsPerView.value = 2;
    } else {
      itemsPerView.value = 3;
    }
  };

  const updateIconSize = () => {
    iconSize.value = window.innerWidth <= 540 ? 12 : 24;
  };

  const updateScrollState = () => {
    const el = document.querySelector('.locations-row') as HTMLElement;
    if (!el) return;

    canScrollLeft.value = el.scrollLeft > 0;
    canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
  };

  const handleScroll = () => {
    updateScrollState();
  };

  onMounted(() => {
    updateItemsPerView();
    updateIconSize();
    window.addEventListener('resize', updateItemsPerView);
    window.addEventListener('resize', updateIconSize);

    const el = document.querySelector('.locations-row');
    if (el) {
      el.addEventListener('scroll', handleScroll);
      setTimeout(updateScrollState, 100);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerView);
    window.removeEventListener('resize', updateIconSize);

    const el = document.querySelector('.locations-row');
    if (el) {
      el.removeEventListener('scroll', handleScroll);
    }
  });

  const scrollToIndex = (index: number) => {
    const el = document.querySelector('.locations-row') as HTMLElement;
    if (!el) return;

    const scrollPosition = index * 220;
    el.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    currentIndex.value = index;
  };

  const scrollLeft = () => scrollToIndex(Math.max(0, currentIndex.value - 1));

  const scrollRight = () => {
    const maxIndex = Math.max(0, locations.length - itemsPerView.value);
    scrollToIndex(Math.min(maxIndex, currentIndex.value + 1));
  };

  if (!locations?.length) return null;

  setTimeout(updateScrollState, 50);

  const showArrows = locations.length > itemsPerView.value;

  return (
    <div className="last-locations-section">
      <div className="locations-carousel">
        {showArrows && (
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={scrollLeft}
            disabled={!canScrollLeft.value}
          >
            <ArrowLeftIcon width={iconSize.value} height={iconSize.value} />
          </button>
        )}

        <div className="locations-row" onScroll={handleScroll}>
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              city={location.city}
              country={location.country}
              temperature={location.temperature}
              lastSearched={location.lastSearched}
              units={location.savedUnits}
              icon={
                location.weatherData?.weather?.[0]?.icon ? (
                  <img
                    src={getWeatherIcon(location.weatherData.weather[0].icon)}
                    alt="Weather"
                  />
                ) : null
              }
              onSelect={() => onSelect(location)}
              onDelete={() => onDelete(location.id)}
            />
          ))}
        </div>

        {showArrows && (
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={scrollRight}
            disabled={!canScrollRight.value}
          >
            <ArrowRightIcon width={iconSize.value} height={iconSize.value} />
          </button>
        )}
      </div>
    </div>
  );
}
