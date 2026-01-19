import { useState, onMounted, onUnmounted } from 'bromium';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import ForecastCard from '../cards/ForecastCard';
import './styles/ForecastSection.css';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastSectionProps {
  forecastData: ForecastItem[];
  city: string;
  formatLabel: (timestamp: number) => string;
}

export default function ForecastSection({ forecastData, city, formatLabel }: ForecastSectionProps) {
  const currentIndex = useState(0);
  const itemsPerView = useState(3);
  const iconSize = useState(24);
  const canScrollLeft = useState(false);
  const canScrollRight = useState(true);

  const updateItems = () => {
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
    const el = document.querySelector('.forecast-scroll') as HTMLElement;
    if (!el) return;

    canScrollLeft.value = el.scrollLeft > 0;
    canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
  };

  const handleScroll = () => {
    updateScrollState();
  };

  onMounted(() => {
    updateItems();
    updateIconSize();
    window.addEventListener('resize', updateItems);
    window.addEventListener('resize', updateIconSize);

    const el = document.querySelector('.forecast-scroll');
    if (el) {
      el.addEventListener('scroll', handleScroll);
      setTimeout(updateScrollState, 100);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateItems);
    window.removeEventListener('resize', updateIconSize);

    const el = document.querySelector('.forecast-scroll');
    if (el) {
      el.removeEventListener('scroll', handleScroll);
    }
  });

  const scrollToIndex = (index: number) => {
    const container = document.querySelector('.forecast-scroll') as HTMLElement;
    if (!container) return;
    container.scrollTo({
      left: index * 190,
      behavior: 'smooth',
    });
    currentIndex.value = index;
  };

  const scrollLeft = () => scrollToIndex(Math.max(0, currentIndex.value - 1));

  const scrollRight = () => {
    const maxIndex = Math.max(0, forecastData.length - itemsPerView.value);
    scrollToIndex(Math.min(maxIndex, currentIndex.value + 1));
  };

  return (
    <div className="forecast-page">
      <div className="forecast-container">
        <button
          className="forecast-arrow"
          onClick={scrollLeft}
          disabled={!canScrollLeft.value}
        >
          <ArrowLeftIcon width={iconSize.value} height={iconSize.value} />
        </button>

        <div className="forecast-scroll">
          {forecastData.map((item) => (
            <ForecastCard
              key={item.dt}
              city={city}
              time={formatLabel(item.dt)}
              icon={item.weather?.[0]?.icon}
              temp={Math.round(item.main?.temp)}
              realFeel={Math.round(item.main?.feels_like)}
              wind={Math.round(item.wind?.speed)}
              humidity={item.main?.humidity}
              timestamp={item.dt}
            />
          ))}
        </div>

        <button
          className="forecast-arrow"
          onClick={scrollRight}
          disabled={!canScrollRight.value}
        >
          <ArrowRightIcon width={iconSize.value} height={iconSize.value} />
        </button>
      </div>
    </div>
  );
}
