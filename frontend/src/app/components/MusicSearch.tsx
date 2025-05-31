import Input from "@/app/ui/Input";
import { LensIcon, MenuIcon } from "../ui/Icons";

const MusicSearch = () => {
  return (
    <section id="explorar" className="flex w-full flex-col items-center justify-center gap-y-8">
      <h1 className="subtitles text-start uppercase md:text-center">
        Encuentra tu artista favorito
      </h1>
      <Input
        placeholder="Busca Artista, Album, Canción"
        startIcon={<MenuIcon />}
        endIcon={<LensIcon />}
        classNameContainer="container-search"
      />
    </section>
  );
};

export default MusicSearch;
