import { useEffect, useState } from "react";
import { useAuth } from "@/auth/hooks/use-auth";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import Button from "@/app/ui/Button";

interface OptionsRegisterCardsProps {
  id: string;
  icono: string;
  option: string;
  description: string;
  imageSrc: string;
  title: string;
  parrafo: string;
  parrafo2: string;
  buttonText: string;
}

const OptionsRegisterCards = ({
  id,
  icono,
  option,
  description,
  imageSrc,
  title,
  parrafo,
  parrafo2,
  buttonText,
}: OptionsRegisterCardsProps) => {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);

  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleRegister = (id: string) => {
    if (id === "musicos" || id === "fans") {
      handleOpenModal("register");
    } else if (id === "eventos") {
      window.location.hash = "#eventos";
    }
  };

  useEffect(() => {
    if (user) setOpenModal(null);
  }, [user]);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showWelcomeUser");
    if (shouldShow) {
      setShowWelcomeUser(true);
      setOpenModal(null);
      localStorage.removeItem("showWelcomeUser");
    }
  }, [user]);

  const HeaderContent = (
    <div className="flex items-center space-x-4 px-4">
      <img src={icono} alt={option} className="h-10 w-10" />
      <div className="gap-1 text-start">
        <h2 className="font-bold">{option}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="text-ecos-blue flex h-20 w-[22.813rem] justify-between rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:hidden">
        {HeaderContent}
        <img
          src={imageSrc}
          alt={title}
          className="h-20 w-[7.5rem] rounded-r-[0.625rem] object-cover"
        />
      </div>

      <div className="text-ecos-blue hidden max-w-[25rem] flex-col justify-between gap-3.5 rounded-[1.25rem] py-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:flex">
        {HeaderContent}
        <img src={imageSrc} alt={title} className="object-cover" />
        <div className="max-h-[6.125rem] w-[21.25rem] space-y-[0.438rem] px-4 text-start">
          <h1 className="font-medium">{title}</h1>
          <p className="text-sm leading-5 tracking-tight">{parrafo}</p>
          <p className="text-sm font-light">{parrafo2}</p>
        </div>

        <div className="flex justify-end p-4">
          <Button
            type="button"
            bgType="primary"
            className="px-10 text-sm"
            onClick={() => {
              handleRegister(id);
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {openModal && <AuthModal mode={openModal} onClose={handleCloseModal} />}

      {showWelcomeUser && (
        <WelcomeUserModal
          onClose={() => {
            setShowWelcomeUser(false);
          }}
        />
      )}
    </>
  );
};

export default OptionsRegisterCards;
