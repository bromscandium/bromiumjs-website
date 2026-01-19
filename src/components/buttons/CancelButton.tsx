import CrossIcon from '../icons/CrossIcon';

interface CancelButtonProps {
  onClick: () => void;
}

export default function CancelButton({ onClick }: CancelButtonProps) {
  return (
    <button onClick={onClick} aria-label="Cancel">
      <CrossIcon size={40} />
    </button>
  );
}
