import { useEffect, useRef, useState } from "react";
import HeroVideo from "@/assets/Video_Ecos.mp4";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import { useAuth } from "@/auth/hooks/use-auth";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { Link } from "react-router";

export default function Hero() {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.preload = "auto";
    });
    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-ecos-blue relative isolate flex h-[calc(100svh-112px)] min-h-[500px] items-end overflow-hidden md:h-[calc(100svh-128px)] md:min-h-[540px]">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={HeroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />
      <div className="bg-ecos-blue/70 absolute inset-0 -z-10" />

      <div className="px-sections mx-auto flex w-full max-w-screen-xl flex-col items-start gap-5 pt-28 pb-10 text-white sm:gap-6 sm:pb-14 md:gap-7 md:pt-32 md:pb-16">
        <p className="border-ecos-orange-light border-l-2 pl-3 text-sm font-bold tracking-[0.16em] uppercase">
          Musica independiente en movimiento
        </p>
        <div className="max-w-3xl space-y-5">
          <h1 className="font-nunito text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Tu proxima conexion musical empieza en{" "}
            <span className="text-ecos-orange-light">Ecos.</span>
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7 md:text-lg">
            Descubre artistas emergentes, comparte tu propuesta y encuentra eventos que merecen ser
            escuchados en vivo.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {!user && (
            <button
              type="button"
              className="button-primary bg-ecos-orange hover:bg-ecos-orange px-5 py-2.5 text-sm font-bold sm:px-6 sm:py-3 sm:text-base"
              onClick={() => {
                setOpenModal("register");
              }}
            >
              Crear cuenta
            </button>
          )}
          <Link
            to={{ pathname: "/", hash: "explorar" }}
            className="button-secondary hover:text-ecos-blue border-white bg-transparent px-5 py-2.5 text-sm font-bold text-white hover:border-white hover:bg-white sm:px-6 sm:py-3 sm:text-base"
          >
            Explorar artistas
          </Link>
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
