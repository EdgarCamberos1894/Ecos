import Logo from "@/app/components/Logo";
import { Link } from "react-router";

export const LogoLink = ({ className }: { className?: string }) => (
  <Link to="/" className={className}>
    <Logo
      textClassName="text-white text-4xl md:text-6xl lg:text-[6rem]"
      svgClassName="text-white w-20 h-20 md:w-24 md:h-24 lg:w-[141px] lg:h-[141px]"
    />
  </Link>
);
