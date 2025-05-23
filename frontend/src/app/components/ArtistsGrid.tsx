import CardArtist from "@/app/components/CardArtist";
import { FeaturedMusician } from "../../home/components/types/FeaturedMusician";

interface ArtistGridProps {
  musicians: FeaturedMusician[];
}

const ArtistGrid = ({ musicians }: ArtistGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_550px)] justify-center space-y-[7.375rem] lg:space-y-0">
      {musicians.map((musician) => (
        <CardArtist key={musician.id} musician={musician} />
      ))}
    </div>
  );
};

export default ArtistGrid;
