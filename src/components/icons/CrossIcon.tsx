interface CrossIconProps {
  size?: number;
}

export default function CrossIcon({ size = 50 }: CrossIconProps) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <img
      src={`${baseUrl}icons/ui/cross.svg`}
      width={size}
      height={size}
      alt="Close"
    />
  );
}
