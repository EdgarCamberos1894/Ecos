import CardArtist from "@/app/ui/CardArtist";
import { FeaturedMusician } from "./types/FeaturedMusician";

interface CardFeaturedArtistsProps {
  musicians: FeaturedMusician[];
}

const CardFeaturedArtists = ({ musicians }: CardFeaturedArtistsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:grid-rows-2">
      {musicians.map((musician) => (
        <CardArtist key={musician.id} musician={musician} />
      ))}
    </div>
  );
};

export default CardFeaturedArtists;
