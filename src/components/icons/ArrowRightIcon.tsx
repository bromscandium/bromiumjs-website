interface ArrowRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ArrowRightIcon({
                                         width = 24,
                                         height = 24,
                                         color = "currentColor",
                                       }: ArrowRightIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
