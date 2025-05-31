import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useEffect, useState } from "react";

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
    <section className="bg-ecos-base-2 flex justify-center px-3.5 py-16 md:px-14 md:py-28 lg:px-[175px] lg:pt-[123px] lg:pb-[165px]">
      <div className="flex h-[182px] w-full max-w-[364px] items-end rounded-[30px] bg-[url('/assets/register-bottom-banner.webp')] bg-cover bg-center bg-no-repeat pb-6 pl-7.5 shadow-[0_4px_4px_0_rgba(0,0,0,.25)] md:h-[471px] md:max-w-[687px] md:px-[70px] md:py-20 lg:h-[486px] lg:max-w-[1570px]">
        <button
          type="button"
          className="button-primary h-[36px] w-[194px] px-6 py-2.5 text-sm md:h-[63px] md:w-[339px] md:text-2xl"
          onClick={() => {
            handleOpenModal("register");
          }}
        >
          Regístrate
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
    </section>
  );
}
