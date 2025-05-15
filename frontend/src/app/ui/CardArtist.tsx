import Button from "@/app/ui/Button";
import defaultImage from "@/assets/imagePlay.svg";
import { FeaturedMusician } from "@/home/components/types/FeaturedMusician";
import { useNavigate } from "react-router";

interface CardArtistProps {
  musician: FeaturedMusician;
}

const CardArtist = ({ musician }: CardArtistProps) => {
  const navigate = useNavigate();

  const { id, stageName, genre, photoUrl, description } = musician;

  const goToMusicianProfile = () => {
    navigate(`/musician-profile/${String(id)}`);
  };

  return (
    <div key={id} className="flex gap-4 rounded-lg px-6 py-2">
      <img src={photoUrl ?? defaultImage} alt="image" className="h-42 w-42 rounded-xl" />

      <div className="flex flex-col gap-4 text-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold">{stageName}</h3>
          <p className="text-xs text-[#49454F]">{genre}</p>
          <p className="line-clamp-7 text-sm whitespace-pre-line text-gray-600">{description}</p>
        </div>
        <Button
          children="Ver más"
          bgType="primary"
          type="button"
          onClick={goToMusicianProfile}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default CardArtist;
