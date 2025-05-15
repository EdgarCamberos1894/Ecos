import { toast } from "sonner";
import CardFeaturedArtists from "../CardFeaturedArtists";
import { useApiQuery } from "@/shared/hooks/use-api-query";

interface Musician {
  id: number;
  stageName: string;
  genre: string;
  photoUrl?: string | null;
  description: string;
}

interface ApiResponse {
  items: Musician[];
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
    <section className="mx-auto mt-24 w-full">
      <h2 className="mx-6 my-16 text-start text-5xl font-semibold text-[#19233A] lg:ms-10">
        Artistas destacados
      </h2>
      {data && <CardFeaturedArtists musicians={data.items} />}
    </section>
  );
};

export default FeaturedArtists;
