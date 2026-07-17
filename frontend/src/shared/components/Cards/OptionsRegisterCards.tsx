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

  useEffect(() => {
    if (user) setOpenModal(null);
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("showWelcomeUser")) {
      setShowWelcomeUser(true);
      setOpenModal(null);
      localStorage.removeItem("showWelcomeUser");
    }
  }, [user]);

  const handleAction = () => {
    if (id === "eventos") {
      document.getElementById("eventos")?.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", "#eventos");
      return;
    }
    setOpenModal("register");
  };

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="bg-ecos-blue/85 absolute inset-x-0 bottom-0 px-5 py-3 text-white">
            <div className="flex items-center gap-3">
              <img src={icono} alt="" className="h-8 w-8" />
              <div>
                <p className="text-sm font-bold tracking-[0.12em] uppercase">{option}</p>
                <p className="text-xs text-white/80">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5 text-left">
          <h3 className="text-ecos-blue text-xl font-bold">{title}</h3>
          <p className="text-sm leading-6 text-slate-600">{parrafo}</p>
          <p className="text-ecos-orange mt-auto text-sm font-semibold">{parrafo2}</p>
          <Button type="button" bgType="primary" className="mt-2 w-full" onClick={handleAction}>
            {buttonText}
          </Button>
        </div>
      </article>
      {openModal && (
        <AuthModal
          mode={openModal}
          onClose={() => {
            setOpenModal(null);
          }}
        />
      )}
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
