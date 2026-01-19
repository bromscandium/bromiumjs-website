import BinIcon from '../icons/BinIcon';

interface DeleteButtonProps {
  onClick: (e: MouseEvent) => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button onClick={onClick}>
      <BinIcon size={22} />
    </button>
  );
}
