interface GearIconProps {
  size?: number;
}

export default function GearIcon({ size = 50 }: GearIconProps) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <img
      src={`${baseUrl}icons/ui/gear.svg`}
      width={size}
      height={size}
      alt="Index"
    />
  );
}
