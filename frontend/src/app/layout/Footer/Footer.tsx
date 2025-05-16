import { Link } from "react-router";
import { InstagramIcon } from "@/app/ui/InstagramIcon";
import { LinkedInIcon } from "@/app/ui/LinkedInIcon";
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
            <LinkedInIcon className="size-10" />
            <InstagramIcon className="size-10" />
          </div>
        </div>
      </div>
      <img
        src={Logo}
        alt="Logo de Ecos"
        className="h-auto w-full max-w-[300px] self-center sm:max-w-[380px]"
      />
      <span className="self-center sm:pt-36">
        Copyright © 2025 ECOS - Todos los derechos reservados.
      </span>
    </footer>
  );
};
