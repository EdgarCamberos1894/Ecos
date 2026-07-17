import { useEffect } from "react";
import CardSong from "./CardSong";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ResponseListOfFavoriteSongs } from "@/profile/types/favorite-songs";

interface FavoriteSongListProps {
  refresh?: number;
}

const FavoriteSongList = ({ refresh }: FavoriteSongListProps) => {
  const { data, refetch } = useApiQuery<ResponseListOfFavoriteSongs>(
    "songs",
    "/saved-songs",
    "all",
  );

  useEffect(() => {
    refetch();
  }, [refresh, refetch]);

  return (
    <section id="favoritos" className="text-ecos-blue scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-ecos-orange text-xs font-bold tracking-[0.14em] uppercase">
            Tu biblioteca
          </p>
          <h2 className="font-nunito mt-1 text-2xl font-bold sm:text-3xl">Canciones favoritas</h2>
        </div>
        {data?.items.length ? (
          <span className="text-sm text-slate-500">{data.items.length} guardadas</span>
        ) : null}
      </div>
      {data?.items.length ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((song) => (
            <CardSong
              key={song.id}
              id={song.id}
              title={song.title}
              artistId={song.musicianInfo.artistId}
              stageName={song.musicianInfo.stageName}
              photoUrl={song.musicianInfo.photoUrl ?? undefined}
              audioUrl={song.audioUrl}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-slate-300 bg-white px-5 py-7 text-sm text-slate-600">
          Aun no tienes canciones guardadas. Explora artistas y crea una coleccion que puedas volver
          a escuchar.
        </div>
      )}
    </section>
  );
};

export default FavoriteSongList;
