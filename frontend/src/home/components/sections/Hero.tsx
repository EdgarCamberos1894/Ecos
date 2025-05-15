import { useEffect, useRef, useState } from "react";
import videoBannerHero from "@/assets/videoBannerHero.webm"; // Importación del video
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import { useAuth } from "@/auth/hooks/use-auth";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

export default function Hero() {
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

  const videoRef = useRef<HTMLVideoElement>(null);
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
    <>
      <div className="relative h-auto w-full flex-col justify-start pb-48 sm:pb-64 lg:-mt-0 lg:h-248">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 min-h-full w-full object-cover"
          src={videoBannerHero}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
        <div className="relative ms-12 w-auto pt-36 md:ms-24 lg:ms-36 lg:w-120">
          <h1 className="w-80 text-start font-sans text-3xl leading-14 font-bold text-white drop-shadow-lg sm:w-138 sm:text-4xl lg:w-112 lg:text-5xl">
            Bienvenidos a Ecos, tu plataforma musical ideal
          </h1>
          <p className="mt-4 w-80 text-start text-sm text-white sm:w-128 lg:w-112 lg:text-lg">
            Descubre un mundo lleno de música y creatividad. Únete a nosotros para compartir tu arte
            y conectar con otros amantes de la música.
          </p>
          <div className="mt-6 flex gap-12">
            <button
              type="submit"
              className="h-12 w-32 cursor-pointer rounded-3xl bg-[#19233A] text-sm text-white hover:bg-[#B1B1B1]"
              onClick={() => {
                handleOpenModal("register");
              }}
            >
              Regístrate
            </button>
            <button
              type="submit"
              className="h-12 w-32 cursor-pointer rounded-3xl bg-[#FE963D] text-sm text-white hover:bg-[#B1B1B1]"
            >
              Explora
            </button>
          </div>
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
}
