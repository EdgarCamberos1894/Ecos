import { useState } from "react";
import { useNavigate } from "react-router";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import useDebounce from "@/shared/hooks/use-debounce";
import SearchCard from "./SearchCard";
import Input from "../ui/Input";
import { Spinner } from "../ui/Spinner";
import { LensIcon, MenuIcon } from "../ui/Icons";
import { type ApiSongs } from "@/profile/musician/musician-types";
import { type SearchResult } from "../types/search-normalize-data";
import { type MusicianApiResponse } from "../types/musician-profile-search";

interface SearchBarProps {
  isFromHeader?: boolean;
}

const SearchBar = ({ isFromHeader }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const navigate = useNavigate();

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

  const handleSelect = (result: SearchResult) => {
    setQuery("");

    const id = result.type === "song" ? result.artistId : result.id;
    navigate(`/profile/musician/${id.toString()}`);
  };

  return (
    <div className={`group relative ${isFromHeader ? "w-full" : ""}`}>
      <Input
        placeholder="Buscar artista, canción"
        startIcon={<MenuIcon />}
        endIcon={
          isSongsFetching && isMusiciansFetching ? <Spinner className="m-2 size-6" /> : <LensIcon />
        }
        classNameContainer={`${isFromHeader ? "flex bg-white items-center gap-2 h-12" : "container-search"} group`}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      {combinedResults.length > 0 ? (
        <div
          className={`border-ecos-input-placeholder absolute z-10 mt-1 hidden max-h-[300px] w-full overflow-y-auto rounded-lg border bg-white shadow-[0_4px_4px_rgba(0,0,0,.25)] group-focus-within:block ${isFromHeader ? "" : "md:right-10 md:left-10 md:max-w-1/2"}`}
        >
          {combinedResults.map((result) => (
            <SearchCard
              key={`${result.type}-${result.id.toString()}`}
              result={result}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        debouncedQuery.length > 0 &&
        !isSongsFetching &&
        !isMusiciansFetching && (
          <div
            className={`border-ecos-input-placeholder text-ecos-blue absolute z-10 mt-1 hidden min-h-[100px] w-full place-content-center overflow-y-auto rounded-lg border bg-white font-bold shadow-[0_4px_4px_rgba(0,0,0,.25)] group-focus-within:grid ${isFromHeader ? "" : "md:right-10 md:left-10 md:max-w-1/2"} `}
          >
            No hay resultados
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;
