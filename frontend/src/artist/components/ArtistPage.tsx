import { useMemo } from "react";
import ArtistSearchEngine from "@/app/components/ArtistSearchEngine";
import ImageBanner from "@/assets/bannerProfileFan.webp";
import CardFeaturedArtists from "@/home/components/CardFeaturedArtists";
import { useApiQuery } from "@/shared/hooks/use-api-query";

interface Musician {
  idMusician: number;
  stageName: string;
  genre: string;
  photoUrl: string | null;
  /*description: string;*/
}

interface ApiResponse {
  content: Musician[];
}

const ArtistPage = () => {
  const { data } = useApiQuery<ApiResponse>("musicians", "/musician-profile/search", "all");

  const genres = useMemo(() => {
    if (!data?.content || data.content.length === 0) return [];

    return data.content.reduce<string[]>((uniqueGenres, musician) => {
      if (!uniqueGenres.includes(musician.genre)) {
        uniqueGenres.push(musician.genre);
      }
      return uniqueGenres;
    }, []);
  }, [data]);

  return (
    <div className="flex w-full flex-col items-center gap-24 px-2.5 lg:px-0">
      <img src={ImageBanner} alt="banner" className="w-full object-cover" />
      <ArtistSearchEngine />
      {genres.map((genre) => (
        <div key={genre} className="w-full text-center">
          <h1 className="mb-4 text-3xl font-bold">{genre}</h1>
          {/* Pasar los músicos filtrados por género al componente CardFeaturedArtists */}
          <CardFeaturedArtists genre={genre} musicians={data?.content ?? []} />
        </div>
      ))}
    </div>
  );
};

export default ArtistPage;
