import { Link } from "react-router";
import LinkedInIcon from "@/assets/RRSS/linkedin.svg?react";
import InstagramIcon from "@/assets/RRSS/instagram.svg?react";
import Logo from "@/assets/EcosLogoFooter.webp";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-start gap-16 self-center px-16 pt-40 lg:items-center">
      <div className="flex flex-col gap-32 lg:flex-row lg:gap-64 xl:gap-[356px]">
        <div className="text-ecos-blue flex flex-col gap-8">
          <h3 className="text-3xl font-medium uppercase">Nosotros</h3>
          <Link to="/">
            <u className="text-2xl">Bienvenidos</u>
          </Link>
          <Link to="/explorer">
            <u className="text-2xl">Explorar</u>
          </Link>
          <Link to="/artist">
            <u className="text-2xl">Artista</u>
          </Link>
          <Link to="/play">
            <u className="text-2xl">Play</u>
          </Link>
        </div>
        <div className="text-ecos-blue flex flex-col items-start gap-8">
          <h3 className="text-3xl font-medium uppercase">Acerca de</h3>
          <Link to="/ayuda">
            <u className="text-2xl">Ayuda</u>
          </Link>
          <Link to="/prensa">
            <u className="text-2xl">Prensa</u>
          </Link>
          <Link to="/politicaDeUso">
            <u className="text-2xl">Politica de uso</u>
          </Link>
        </div>
        <div className="text-ecos-blue flex flex-col items-start gap-8">
          <h3 className="text-3xl font-medium uppercase">Seguinos</h3>
          <div className="flex gap-5">
            <Link
              title="LinkedIn de ECOS"
              to="https://www.linkedin.com/company/equipo-22-ftg/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil de LinkedIn de ECOS"
              className="transition-transform hover:scale-105 focus-visible:scale-105"
            >
              <LinkedInIcon className="size-10" />
            </Link>
            <Link
              title="Instagram de ECOS"
              to="https://www.instagram.com/ecos.web/?g=5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil de Instagram de ECOS"
              className="transition-transform hover:scale-105 focus-visible:scale-105"
            >
              <InstagramIcon className="size-10" />
            </Link>
          </div>
        </div>
      </div>
      <img
        src={Logo}
        alt="Logo de Ecos"
        className="h-auto w-full max-w-[300px] self-center sm:max-w-[380px]"
      />
      <span className="mb-3.5 self-center text-balance sm:pt-36">
        Copyright © 2025 ECOS - Todos los derechos reservados.
      </span>
    </footer>
  );
};
