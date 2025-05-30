import Input from "@/app/ui/Input";
import MenuIcon from "@/app/ui/MenuIcon";
import Lens from "@/app/ui/LensIcon";

const MusicSearch = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-8">
      <h1 className="subtitles text-start uppercase md:text-center">
        Encuentra tu artista favorito
      </h1>
      <Input
        placeholder="Busca Artista, Album, Canción"
        startIcon={<MenuIcon />}
        endIcon={<Lens />}
        classNameContainer="container-search"
      />
    </section>
  );
};

export default MusicSearch;
