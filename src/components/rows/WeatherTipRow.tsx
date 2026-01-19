import './styles/WeatherTipRow.css';

interface WeatherTipRowProps {
  tip: string[] | null;
}

export default function WeatherTipRow({ tip }: WeatherTipRowProps) {
  if (!tip) return null;

  return (
    <div className="tip-row">
      <div className="tip-content">
        <h3 className="tip-title">Small Tip:</h3>
        <p className="tip-text">{tip}</p>
      </div>
    </div>
  );
}
