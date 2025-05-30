import MusicSearch from "@/app/components/MusicSearch";
import FeaturedSongs from "../FeaturedSongs";

const DiscoverArtist = () => {
  return (
    <section
      id="explorar"
      className="noScrollbar w-full max-w-screen items-center gap-y-8 overflow-visible overflow-x-auto pt-20"
    >
      <MusicSearch />
      <FeaturedSongs />
    </section>
  );
};

export default DiscoverArtist;
