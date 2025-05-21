import MusicSearch from "@/app/components/MusicSearch";
import FeaturedSongs from "../FeaturedSongs";

const DiscoverArtist = () => {
  return (
    <section
      id="#explorar"
      className="noScrollbar w-full max-w-screen gap-[0.813rem] overflow-visible overflow-x-auto lg:mr-[2.125rem]"
    >
      <MusicSearch />
      <FeaturedSongs />
    </section>
  );
};

export default DiscoverArtist;
