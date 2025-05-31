import SearchBar from "./SearchBar";

const MusicSearch = () => {
  return (
    <section id="explorar" className="flex w-full flex-col items-center justify-center gap-y-8">
      <h1 className="subtitles text-start uppercase md:text-center">
        Encuentra tu artista favorito
      </h1>

      <SearchBar />
    </section>
  );
};

export default MusicSearch;
