import { Link } from "react-router";
import LinkedInIcon from "@/assets/RRSS/linkedin.svg";
import InstagramIcon from "@/assets/RRSS/instagram.svg";
import Logo from "@/app/components/Logo";

const navigationLinks = [
  { label: "Inicio", to: "/" },
  { label: "Explorar", to: { pathname: "/", hash: "explorar" } },
  { label: "Eventos", to: { pathname: "/", hash: "eventos" } },
  { label: "Preguntas frecuentes", to: { pathname: "/", hash: "preguntas-frecuentes" } },
];

export const Footer = () => (
  <footer className="bg-ecos-blue mt-14 text-white md:mt-20">
    <div className="px-sections mx-auto grid w-full max-w-screen-xl gap-12 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
      <div className="max-w-sm space-y-5">
        <Logo
          svgClassName="h-12 w-12 text-white"
          textClassName="text-4xl text-white"
          containerClassName="w-fit"
        />
        <p className="text-sm leading-6 text-white/75">
          La plataforma para descubrir artistas, compartir musica y vivir la escena independiente.
        </p>
      </div>

      <nav aria-label="Navegacion del pie de pagina" className="space-y-4">
        <h3 className="text-ecos-orange-light text-sm font-bold tracking-[0.14em] uppercase">
          Navega
        </h3>
        <ul className="space-y-3 text-sm text-white/80">
          {navigationLinks.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className="hover:text-ecos-orange-light focus-visible:outline-ecos-orange-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4">
        <h3 className="text-ecos-orange-light text-sm font-bold tracking-[0.14em] uppercase">
          Siguenos
        </h3>
        <p className="text-sm leading-6 text-white/75">
          Conoce a la comunidad y los nuevos proyectos de Ecos.
        </p>
        <div className="flex gap-3">
          <Link
            title="LinkedIn de Ecos"
            to="https://www.linkedin.com/company/equipo-22-ftg/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar perfil de LinkedIn de Ecos"
            className="hover:border-ecos-orange-light focus-visible:outline-ecos-orange-light rounded-md border border-white/20 p-2 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <img src={LinkedInIcon} alt="" className="size-5" />
          </Link>
          <Link
            title="Instagram de Ecos"
            to="https://www.instagram.com/ecos.web/?g=5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar perfil de Instagram de Ecos"
            className="hover:border-ecos-orange-light focus-visible:outline-ecos-orange-light rounded-md border border-white/20 p-2 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <img src={InstagramIcon} alt="" className="size-5" />
          </Link>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
      Copyright (c) {new Date().getFullYear()} ECOS. Todos los derechos reservados.
    </div>
  </footer>
);
