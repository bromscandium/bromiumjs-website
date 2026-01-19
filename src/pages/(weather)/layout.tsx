import Tabs from "@/components/layouts/Tabs.tsx";
import './layout.css';

interface LayoutProps {
  children: any;
}

export default function WeatherLayout({children}: LayoutProps) {
  return (
    <div className="weather-layout">
      <Tabs/>
      {children}
    </div>
  );
}
