interface MagnifyingGlassIconProps {
  size?: number;
}

export default function MagnifyingGlassIcon({ size = 24 }: MagnifyingGlassIconProps) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <img
      src={`${baseUrl}icons/ui/magnifying-glass.svg`}
      width={size}
      height={size}
      alt="Search"
    />
  );
}
