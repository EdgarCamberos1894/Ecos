import { Link } from "react-router";
import { RoutesFanNavbar } from "./RoutesFanNavbar";

export const FanNavbar = ({ userId }: { userId: string }) => (
  <nav className="hidden gap-20 lg:flex">
    {RoutesFanNavbar.map((item) => (
      <Link key={item.name} to={item.hash.replace(":id", userId)} className="text-2xl text-white">
        {item.name}
      </Link>
    ))}
  </nav>
);
