import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useEffect, useState } from "react";
import BannerGuitar from "@/assets/GuitarsBanner.webp";

export default function BannerGuitarsRegister() {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };
  const handleCloseModal = () => {
    setOpenModal(null);
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
  return (
    <>
      <div className="relative">
        <img
          src={BannerGuitar}
          className="m-auto h-[182px] w-[364px] rounded-2xl shadow-2xl md:h-[471px] md:w-[687px] lg:h-[486px] lg:w-[1570px]"
          alt="Banner Guitar"
        />
        <button
          type="button"
          className="bg-ecos-orange-light hover:bg-ecos-dark-grey-light absolute bottom-6 left-20 z-10 h-[36px] w-[194px] cursor-pointer rounded-4xl text-xl text-white md:bottom-12 md:left-36 md:h-[63px] md:w-[339px] md:text-2xl lg:bottom-16 lg:left-44"
          onClick={() => {
            handleOpenModal("register");
          }}
        >
          Registrate
        </button>
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
}
