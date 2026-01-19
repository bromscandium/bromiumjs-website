import LogoIcon from '../icons/LogoIcon';

interface LogoButtonProps {
  onClick: () => void;
}

export default function LogoButton({ onClick }: LogoButtonProps) {
  return (
    <button onClick={onClick} aria-label="Home">
      <LogoIcon size={40} />
    </button>
  );
}
