import { useEffect, useRef, useState } from "react";
import HeroVideo from "@/assets/Video_Ecos.mp4";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import { useAuth } from "@/auth/hooks/use-auth";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

export default function Hero() {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleScrollToExploreSection = () => {
    const $section = document.getElementById("#explorar");
    if ($section) $section.scrollIntoView({ behavior: "smooth" });
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current instanceof HTMLVideoElement) {
          videoRef.current.setAttribute("preload", "auto");
        }
      },
      { threshold: 0.5 },
    );
    if (videoRef.current instanceof HTMLVideoElement) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="grid">
      <video
        ref={videoRef}
        className="aspect[1920/986] relative max-h-[986px] w-full object-cover"
        src={HeroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />

      <div className="absolute ml-2 flex max-w-[300px] flex-col gap-5 self-center rounded-[30px] bg-white/88 px-3.5 py-3 md:ml-10 md:max-w-[520px] md:gap-11 md:px-[30px] md:py-[25px] lg:ml-[152px] lg:max-w-[640px] lg:px-[60px] lg:py-[50px]">
        <div className="flex flex-col gap-3 md:gap-6">
          <h1 className="text-ecos-blue text-2xl leading-tight text-shadow-[0_4px_4px_rgba(0,0,0,.25)] md:text-5xl lg:text-[64px]">
            Bienvenido a <span className="text-ecos-orange-light">Ecos</span> tu plataforma musical
            ideal
          </h1>
          <h2 className="text-ecos-blue text-xs text-balance md:text-sm md:leading-8 lg:text-2xl">
            Descubre un mundo lleno de música y creatividad. Únete a nosotros para compartir tu arte
            y conectar con otros amantes de la música
          </h2>
        </div>
        {!user ? (
          <div className="flex gap-5 md:gap-8">
            <button
              type="button"
              className="button-primary px-4 py-2 text-xs font-medium transition-colors md:px-6 md:py-2.5 md:text-base"
              onClick={() => {
                handleOpenModal("register");
              }}
            >
              Regístrate
            </button>
            <button
              type="button"
              onClick={handleScrollToExploreSection}
              className="button-secondary px-4 py-2 text-xs font-medium transition-colors md:px-6 md:py-2.5 md:text-base"
            >
              Explora
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={handleScrollToExploreSection}
              className="button-primary px-4 py-2 text-xs font-medium transition-colors md:px-6 md:py-2.5 md:text-base"
            >
              Explora
            </button>
          </div>
        )}
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
