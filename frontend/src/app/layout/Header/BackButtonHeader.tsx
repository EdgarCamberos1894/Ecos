import { BackArrow } from "@/app/ui/Icons";
import { useNavigate } from "react-router";

export const BackButtonHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-ecos-blue flex h-full min-h-36 items-center">
      <BackArrow onClick={() => navigate(-1)} className="ml-16 cursor-pointer text-white" />
    </header>
  );
};
