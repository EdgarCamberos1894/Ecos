import { useApiQuery } from "@/shared/hooks/use-api-query";
import SongsGrid from "./SongGrid";
import { SongList } from "./types/SongList";

interface ApiResponseSongs {
  items: SongList[];
}

const FeaturedSongs = () => {
  const { data } = useApiQuery<ApiResponseSongs>("songs", "songs", "featured");
  return (
    <section className="ml-36 flex w-full flex-col overflow-visible">
      <h2 className="subtitles mt-[2.625rem] mb-11 text-start">Temas destacados</h2>
      <div className="w-full">{data && <SongsGrid songs={data.items} />}</div>
    </section>
  );
};

export default FeaturedSongs;
