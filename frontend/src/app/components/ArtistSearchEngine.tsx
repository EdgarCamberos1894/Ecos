import Input from "@/app/ui/Input";
import MenuIcon from "@/assets/hamburgerMenu.svg?react";
import Lens from "@/assets/lens.svg?react";

const ArtistSearchEngine = () => {
  return (
    <section className="w-full">
      <h1 className="mb-12 text-center text-2xl font-semibold text-[#19233A] sm:text-4xl lg:text-5xl">
        Encuentra tu artista favorito
      </h1>
      <div className="container mx-auto w-full px-4 pb-6">
        <Input
          placeholder="Busca Artista, Album, Canción"
          className="mx-auto flex w-full bg-[#ECE6F0] sm:w-4/5"
          startIcon={<MenuIcon />}
          endIcon={<Lens />}
        />
      </div>
    </section>
  );
};

export default ArtistSearchEngine;
