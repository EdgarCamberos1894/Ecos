import { useApiQuery } from "@/shared/hooks/use-api-query";
import SongsGrid from "./SongGrid";
import { SongList } from "./types/SongList";

interface ApiResponseSongs {
  items: SongList[];
}

interface FeaturedSongsProps {
  onFavoriteAdded?: () => void;
}

const FeaturedSongs = ({ onFavoriteAdded }: FeaturedSongsProps) => {
  const { data } = useApiQuery<ApiResponseSongs>("songs", "songs", "featured");

  return (
    <section className="flex w-full flex-col space-y-6 overflow-visible">
      <h2 className="subtitles text-start">Canciones destacadas</h2>
      {data?.items.length ? (
        <SongsGrid songs={data.items} onFavoriteAdded={onFavoriteAdded} />
      ) : (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white/60 px-5 py-6 text-sm text-slate-600">
          Aun no hay canciones destacadas disponibles.
        </p>
      )}
    </section>
  );
};

export default FeaturedSongs;
