import { BackArrow } from "@/app/ui/Icons";
import { useAuth } from "@/auth/hooks/use-auth";
import { useNavigate } from "react-router";

export const BackButtonHeader = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleBackNavigation = () => {
    if (user?.role === "MUSICIAN") {
      navigate(`/profile/musician/${user.id}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-ecos-blue flex h-full min-h-20 items-center sm:min-h-36">
      <BackArrow
        onClick={handleBackNavigation}
        className="ml-3.5 cursor-pointer text-white sm:ml-16"
      />
    </header>
  );
};
