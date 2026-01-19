interface BinIconProps {
  size?: number;
}

export default function BinIcon({ size = 24 }: BinIconProps) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <img
      src={`${baseUrl}icons/ui/bin.svg`}
      width={size}
      height={size}
      alt="Delete"
    />
  );
}
