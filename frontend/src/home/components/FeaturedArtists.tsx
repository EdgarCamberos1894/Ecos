import { CheckIcon } from "@/auth/components/ui/CheckIcon";
import CardFeaturedArtists from "./CardFeaturedArtists";
import Button from "@/app/ui/Button";

const FeaturedArtists = () => {
  return (
    <section className="ms-52 mt-24 max-w-[1920px]">
      <h2 className="mb-8 text-start font-[roboto] text-[40px]">Artista destacado</h2>

      <CardFeaturedArtists />

      <div className="mt-8 h-[75px] w-[144px]">
        <Button type="submit" className="rounded-l-none">
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
