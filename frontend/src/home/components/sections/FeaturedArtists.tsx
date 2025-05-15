import { CheckIcon } from "@/home/components/ui/CheckIcon";
import CardFeaturedArtists from "./CardFeaturedArtists";
import Button from "@/app/ui/Button";

const FeaturedArtists = () => {
  return (
    <section className="mx-auto mt-24 w-full">
      <h2 className="mx-6 my-16 text-start text-5xl font-semibold text-[#19233A] lg:ms-10">
        Artistas destacados
      </h2>

      <CardFeaturedArtists />

      <div className="mx-8 mt-16 hidden h-18 lg:flex lg:justify-center">
        <Button type="submit" className="rounded bg-[#19233A] text-white lg:w-96">
          <span className="flex items-center">
            <CheckIcon className="mr-2" />
            Ver más
          </span>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedArtists;
