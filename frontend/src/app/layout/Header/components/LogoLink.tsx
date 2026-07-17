import Logo from "@/app/components/Logo";
import { Link } from "react-router";

export const LogoLink = ({ className }: { className?: string }) => (
  <Link to="/" className={className}>
    <Logo
      textClassName="text-white text-3xl md:text-4xl"
      svgClassName="text-white h-12 w-12 md:h-14 md:w-14"
    />
  </Link>
);
