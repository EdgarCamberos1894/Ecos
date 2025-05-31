import { useState } from "react";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import useDebounce from "@/shared/hooks/use-debounce";
import Input from "@/app/ui/Input";
import SearchCard from "./SearchCard";
import { LensIcon, MenuIcon } from "../ui/Icons";
import { Spinner } from "../ui/Spinner";
import { type SearchResult } from "../types/search-normalize-data";
import { type ApiSongs } from "@/profile/musician/musician-types";
import { type MusicianApiResponse } from "../types/musician-profile-search";

const MusicSearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const isEnabled = debouncedQuery.trim().length > 0;

  const { data: songs, isFetching: isSongsFetching } = useApiQuery<ApiSongs>(
    "searchSongs",
    `songs/search?search=${debouncedQuery}`,
    debouncedQuery,
    isEnabled,
  );

  const { data: musicians, isFetching: isMusiciansFetching } = useApiQuery<MusicianApiResponse>(
    "searchMusicians",
    `musician-profile/search?search=${debouncedQuery}`,
    debouncedQuery,
    isEnabled,
  );

  const musicianResults: SearchResult[] =
    musicians?.items.map(({ description, genre, id, photoUrl, stageName }) => ({
      type: "musician",
      id: id,
      photoUrl: photoUrl,
      stageName: stageName,
      genre: genre,
      description: description,
    })) ?? [];

  const songResults: SearchResult[] =
    songs?.items.map((song) => ({
      type: "song",
      id: song.id,
      title: song.title,
      genre: song.genre,
      photoUrl: song.musicianInfo.photoUrl,
      stageName: song.musicianInfo.stageName,
      artistId: song.musicianInfo.artistId,
    })) ?? [];

  const combinedResults: SearchResult[] = [...musicianResults, ...songResults];

  return (
    <section id="explorar" className="flex w-full flex-col items-center justify-center gap-y-8">
      <h1 className="subtitles text-start uppercase md:text-center">
        Encuentra tu artista favorito
      </h1>

      <div className="group relative">
        <Input
          placeholder="Busca Artista, Album, Canción"
          startIcon={<MenuIcon />}
          endIcon={
            isSongsFetching && isMusiciansFetching ? (
              <Spinner className="m-2 size-6" />
            ) : (
              <LensIcon />
            )
          }
          classNameContainer="container-search group"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />

        {combinedResults.length > 0 ? (
          <div className="border-ecos-input-placeholder absolute z-10 mt-1 hidden max-h-[300px] w-full overflow-y-auto rounded-lg border bg-white shadow-[0_4px_4px_rgba(0,0,0,.25)] group-focus-within:block md:right-10 md:left-10 md:max-w-1/2">
            {combinedResults.map((result) => (
              <SearchCard key={`${result.type}-${result.id.toString()}`} result={result} />
            ))}
          </div>
        ) : (
          debouncedQuery.length > 0 &&
          !isSongsFetching &&
          !isMusiciansFetching && (
            <div className="border-ecos-input-placeholder text-ecos-blue absolute z-10 mt-1 hidden min-h-[100px] w-full place-content-center overflow-y-auto rounded-lg border bg-white font-bold shadow-[0_4px_4px_rgba(0,0,0,.25)] group-focus-within:grid md:right-10 md:left-10 md:max-w-1/2">
              No hay resultados
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default MusicSearch;
