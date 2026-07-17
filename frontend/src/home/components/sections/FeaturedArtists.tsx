import ArtistGrid from "@/app/components/ArtistsGrid";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { FeaturedMusician } from "../types/FeaturedMusician";

interface ApiResponse {
  items: FeaturedMusician[];
}

const FeaturedArtists = () => {
  const { data } = useApiQuery<ApiResponse>("musicians", "/musician-profile/search", "featured");

  return (
    <section id="artistas-destacados" className="space-y-6">
      <h2 className="subtitles text-start">Artistas destacados</h2>
      {data?.items.length ? (
        <ArtistGrid musicians={data.items} />
      ) : (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white/60 px-5 py-6 text-sm text-slate-600">
          Aun no hay artistas destacados disponibles.
        </p>
      )}
    </section>
  );
};

export default FeaturedArtists;
