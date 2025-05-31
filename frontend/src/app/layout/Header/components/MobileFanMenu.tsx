import { Link } from "react-router";
import { RoutesFanNavbar } from "./RoutesFanNavbar";

export const MobileFanMenu = ({
  userId,
  isOpen,
  closeMenu,
}: {
  userId: string;
  isOpen: boolean;
  closeMenu: () => void;
}) =>
  isOpen && (
    <nav
      className="absolute top-full -right-20 z-10 flex w-max max-w-xs flex-col items-start gap-4 rounded-[1.25rem] bg-white px-[1.625rem] py-[4rem] shadow-md lg:hidden"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {RoutesFanNavbar.map((item) => (
        <Link
          key={item.name}
          to={item.hash.replace(":id", userId)}
          onClick={closeMenu}
          className="text-ecos-blue text-xl"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
