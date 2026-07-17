import CardArtist from "@/app/components/CardArtist";
import { FeaturedMusician } from "../../home/components/types/FeaturedMusician";

interface ArtistGridProps {
  musicians?: FeaturedMusician[];
}

const emptyMusicians: FeaturedMusician[] = [];

const ArtistGrid = ({ musicians = emptyMusicians }: ArtistGridProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      {musicians.map((musician) => (
        <CardArtist key={musician.id} musician={musician} />
      ))}
    </div>
  );
};

export default ArtistGrid;
