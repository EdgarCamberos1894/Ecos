import { toast } from "sonner";
import ArtistGrid from "@/app/components/ArtistsGrid";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { FeaturedMusician } from "../types/FeaturedMusician";

interface ApiResponse {
  items: FeaturedMusician[];
}

const FeaturedArtists = () => {
  const { data, isError } = useApiQuery<ApiResponse>(
    "musicians",
    "/musician-profile/search",
    "featured",
  );
  if (isError || !data) {
    toast.error("Error al cargar los artistas");
  }

  return (
    <section id="#artistas" className="mt-24 px-2.5 lg:px-12">
      <h2 className="my-16 text-start text-5xl font-semibold text-[#19233A]">
        Artistas destacados
      </h2>
      {data && <ArtistGrid musicians={data.items} />}
    </section>
  );
};

export default FeaturedArtists;
