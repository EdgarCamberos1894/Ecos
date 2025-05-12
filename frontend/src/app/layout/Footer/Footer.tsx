import { Link } from "react-router";
import Button from "@/app/ui/Button";
import tiktok from "@/assets/iconoTiktok.svg";
import instagram from "@/assets/iconoInstagram.svg";
import youtube from "@/assets/iconoYoutube.svg";
import facebook from "@/assets/iconoFacebook.svg";

const SocialLinks = () => (
  <div className="flex w-full items-center gap-2">
    <a href="" target="_blank" rel="noopener noreferrer" className="max-h-12 max-w-12">
      <img src={youtube} alt="Youtube" />
    </a>
    <a href="" target="_blank" rel="noopener noreferrer" className="max-h-12 max-w-12">
      <img src={instagram} alt="Instagram" />
    </a>
    <a href="" target="_blank" rel="noopener noreferrer" className="max-h-12 max-w-12">
      <img src={tiktok} alt="Tiktok" />
    </a>
    <a href="" target="_blank" rel="noopener noreferrer" className="max-h-12 max-w-12">
      <img src={facebook} alt="Facebook" />
    </a>
  </div>
);

export const Footer = () => {
  return (
    <footer className="mt-6 flex flex-col items-center sm:mx-8 sm:items-start">
      <div className="flex flex-col items-start gap-18 md:inline-flex lg:mx-auto lg:flex-row">
        <div className="flex flex-col items-start gap-6">
          <h3 className="text-xl font-medium">NOSOTROS</h3>
          <Link to="/" className="border-b text-[#19233A]">
            bienvenidos
          </Link>
          <Link to="/explorer" className="border-b text-[#19233A]">
            explorar
          </Link>
          <Link to="/artist" className="border-b text-[#19233A]">
            artista
          </Link>
          <Link to="/play" className="border-b text-[#19233A]">
            play
          </Link>
        </div>
        <div className="flex flex-col items-start gap-8">
          <h3 className="text-xl font-medium text-[#19233A]">ACERCA DE</h3>
          <Link to="/ayuda" className="border-b text-[#19233A]">
            ayuda
          </Link>
          <Link to="/prensa" className="border-b text-[#19233A]">
            prensa
          </Link>
          <Link to="/politicaDeUso" className="border-b text-[#19233A]">
            politica de uso
          </Link>
        </div>
        <div className="flex flex-col items-start gap-8">
          <h3 className="text-xl font-medium text-[#19233A]">¿ERES ORGANIZADOR/PROMOTOR?</h3>
          <Button className="max-w-72 bg-[#19233A] text-white lg:w-96">CREAR EVENTO</Button>
        </div>
        <div className="flex flex-col items-start gap-8">
          <h3 className="text-xl font-medium text-[#19233A]">SEGUINOS</h3>
          <SocialLinks />
        </div>
      </div>
      <span className="mx-auto mt-16 mb-6 text-[#19233A]">
        Copyright © 2025 ECOS - Todos los derechos reservados.
      </span>
    </footer>
  );
};
