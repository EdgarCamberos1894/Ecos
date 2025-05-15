import { BackArrow } from "@/app/ui/BackArrow";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import { Link } from "react-router";

export const BackButtonHeader = () => {
  const user = useRequiredUser();

  return (
    <header className="bg-ecos-blue flex h-full min-h-36 items-center">
      <Link to={`/profile/musician/${user.id}`} className="ml-16">
        <BackArrow className="cursor-pointer text-white" />
      </Link>
    </header>
  );
};
