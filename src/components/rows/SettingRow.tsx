import './styles/SettingRow.css';

interface Option {
  value: string;
  label: string;
}

interface SettingRowProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function SettingRow({
  label,
  options,
  selectedValue,
  onChange,
}: SettingRowProps) {
  return (
    <div className="setting-row">
      <span className="setting-label">{label}</span>
      <div className="setting-options">
        {options.map((option) => (
          <button
            key={option.value}
            className={`setting-option ${selectedValue === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
