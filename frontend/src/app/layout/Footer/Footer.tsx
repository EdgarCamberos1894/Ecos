import { Link } from "react-router";
import LinkedInIcon from "@/assets/RRSS/linkedin.svg";
import InstagramIcon from "@/assets/RRSS/instagram.svg";
import Logo from "@/app/components/Logo";

export const Footer = () => {
  return (
    <footer className="flex w-screen flex-col items-start gap-16 px-[0.813rem] pt-[115px] lg:items-center lg:pt-[180px]">
      <div className="grid grid-cols-1 gap-y-32 lg:grid-cols-[2fr_2fr_1fr] lg:justify-items-center">
        <Logo
          svgClassName="text-ecos-blue w-full h-[141px] hidden lg:block"
          textClassName="text-ecos-blue w-full h-auto text-[120px] hidden lg:block"
          containerClassName="hidden lg:block"
        />

        {/*NOSOTROS*/}
        <div className="text-ecos-blue flex flex-col gap-[34px] lg:justify-self-end">
          <h3 className="text-[32px] font-medium uppercase">Nosotros</h3>
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <u className="text-2xl font-light">Bienvenido</u>
          </Link>
          <Link to={{ pathname: "/", hash: "explorar" }}>
            <u className="text-2xl font-light">Explorar</u>
          </Link>
          <Link to={{ pathname: "/", hash: "eventos" }}>
            <u className="text-2xl font-light">Eventos</u>
          </Link>
          <Link to={{ pathname: "/", hash: "preguntas-frecuentes" }}>
            <u className="text-2xl font-light">Preguntas frecuentes</u>
          </Link>
        </div>

        {/*SÍGUENOS*/}
        <div className="text-ecos-blue flex flex-col items-start gap-[34px] lg:justify-self-end">
          <h3 className="text-[32px] font-medium uppercase">Síguenos</h3>
          <div className="flex gap-[19px]">
            <Link
              title="LinkedIn de ECOS"
              to="https://www.linkedin.com/company/equipo-22-ftg/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil de LinkedIn de ECOS"
              className="transition-transform hover:scale-105 focus-visible:scale-105"
            >
              <img src={LinkedInIcon} alt="Icono Linkedin" className="size-10" />
            </Link>
            <Link
              title="Instagram de ECOS"
              to="https://www.instagram.com/ecos.web/?g=5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil de Instagram de ECOS"
              className="transition-transform hover:scale-105 focus-visible:scale-105"
            >
              <img src={InstagramIcon} alt="Icono Instagram" className="size-10" />
            </Link>
          </div>
        </div>
      </div>

      <p className="w-full pt-36 pb-6 text-center text-xs font-light sm:text-2xl md:self-center">
        Copyright © {new Date().getFullYear()} <span className="font-medium">ECOS</span> - Todos
        los derechos reservados.
      </p>
    </footer>
  );
};
