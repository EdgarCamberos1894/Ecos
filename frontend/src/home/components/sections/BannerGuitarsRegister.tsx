import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useEffect, useState } from "react";

export default function BannerGuitarsRegister() {
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

  return (
    <section className="bg-ecos-base-2 px-sections py-14 md:py-20">
      <div className="mx-auto max-w-screen-xl overflow-hidden rounded-lg bg-[url('/assets/register-bottom-banner.webp')] bg-cover bg-center shadow-xl">
        <div className="bg-ecos-blue/75 flex min-h-[300px] items-end p-6 sm:min-h-[360px] sm:p-10 lg:min-h-[410px] lg:p-14">
          <div className="max-w-xl space-y-5 text-white">
            <p className="text-ecos-orange-light text-xs font-bold tracking-[0.16em] uppercase">
              Tu lugar en la escena
            </p>
            <h2 className="font-nunito text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              Lo que haces merece una audiencia.
            </h2>
            <p className="max-w-lg text-sm leading-6 text-white/85 sm:text-base">
              Crea tu perfil, descubre artistas y forma parte de una comunidad que impulsa la musica
              independiente.
            </p>
            <button
              type="button"
              className="button-primary bg-ecos-orange hover:bg-ecos-orange px-6 py-3 text-base font-bold"
              onClick={() => {
                setOpenModal("register");
              }}
            >
              Crear mi cuenta
            </button>
          </div>
        </div>
      </div>
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
    </section>
  );
}
