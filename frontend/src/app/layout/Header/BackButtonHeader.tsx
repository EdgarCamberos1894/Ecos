import { BackArrow } from "@/app/ui/BackArrow";
import { Link } from "react-router";

export const BackButtonHeader = () => {
  return (
    <header className="bg-ecos-blue flex h-full min-h-36 items-center">
      <Link to={"/profile/musician"} className="ml-16">
        <BackArrow className="cursor-pointer text-white" />
      </Link>
    </header>
  );
};
