import { Link } from "react-router";
import { RoutesFanNavbar } from "./RoutesFanNavbar";

export const FanNavbar = ({ userId }: { userId: string }) => (
  <nav className="hidden min-w-0 gap-8 xl:flex 2xl:gap-14">
    {RoutesFanNavbar.map((item) => (
      <Link
        key={item.name}
        to={item.path.replace(":id", userId)}
        className="hover:text-ecos-orange-light text-base whitespace-nowrap text-white transition-colors 2xl:text-xl"
      >
        {item.name}
      </Link>
    ))}
  </nav>
);
