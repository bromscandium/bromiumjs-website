import "./styles/LogoIcon.css";

interface LogoIconProps {
  size?: number;
}

export default function LogoIcon({ size = 50 }: LogoIconProps) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <img
      src={`${baseUrl}logo512.png`}
      className="logo-icon"
      width={size}
      height={size}
      alt="Logo"
    />
  );
}
