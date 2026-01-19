import GearIcon from '../icons/GearIcon';

interface SettingsButtonProps {
  onClick: () => void;
}

export default function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <button onClick={onClick} aria-label="Index">
      <GearIcon size={40} />
    </button>
  );
}
