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
    navigate(`/profile/musician/${String(id)}`);
  };

  return (
    <div key={id} className="flex h-full gap-6 px-6 py-2">
      <img
        src={photoUrl ?? defaultImage}
        alt="image"
        className="h-[228px] w-[229px] rounded-[28px] object-cover"
      />

      <div className="text-ecos-blue flex flex-col gap-1 text-start">
        <div className="flex flex-col gap-1 pb-6">
          <h3 className="text-2xl">{stageName}</h3>
          <p className="text-xs font-medium">{genre}</p>
          <p className="line-clamp-7 text-sm whitespace-pre-line">{description}</p>
        </div>
        <Button
          children="Ver más"
          bgType="primary"
          type="button"
          onClick={goToMusicianProfile}
          className="w-[110px] px-6 py-2.5 text-white"
        />
      </div>
    </div>
  );
};

export default CardArtist;
