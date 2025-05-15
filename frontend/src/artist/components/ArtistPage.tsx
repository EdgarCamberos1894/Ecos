import { useMemo, useEffect } from "react";
import MusicSearch from "@/app/components/MusicSearch";
import ImageBanner from "@/assets/bannerProfileFan.webp";
import ArtistGrid from "@/app/components/ArtistsGrid";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { FeaturedMusician } from "@/home/components/types/FeaturedMusician";
import { toast } from "sonner";

interface ApiResponse {
  items: FeaturedMusician[];
}

const ArtistPage = () => {
  const { data, isError } = useApiQuery<ApiResponse>(
    "musicians",
    "/musician-profile/search",
    "all",
  );

  useEffect(() => {
    if (isError) {
      toast.error("Error al cargar los artistas");
    }
  }, [isError]);

  const genres = useMemo(() => {
    if (!data?.items || data.items.length === 0) return [];

    const uniqueGenres: string[] = [];
    data.items.forEach((musician) => {
      if (musician.genre && !uniqueGenres.includes(musician.genre)) {
        uniqueGenres.push(musician.genre);
      }
    });

    return uniqueGenres;
  }, [data]);

  return (
    <div className="flex w-full flex-col items-center gap-24 px-2.5 lg:px-0">
      <img src={ImageBanner} alt="banner" className="w-full object-cover" />
      <MusicSearch />

      {genres.map((genre) => {
        const filteredMusicians = data?.items.filter((musician) => musician.genre === genre) ?? [];

        return (
          <div key={genre} className="w-full">
            <h1 className="p-12 text-3xl font-bold">{genre.toLocaleUpperCase()}</h1>
            <ArtistGrid musicians={filteredMusicians} />
          </div>
        );
      })}
    </div>
  );
};

export default ArtistPage;
