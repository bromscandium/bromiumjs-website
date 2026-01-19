import "./styles/CityButton.css";

interface CityButtonProps {
  city: string;
  onClick: () => void;
}

export default function CityButton({ city, onClick }: CityButtonProps) {
  return (
    <div className="city-button" role="button" tabIndex={0} onClick={onClick}>
      <span className="city-button-text">{city}</span>
    </div>
  );
}
