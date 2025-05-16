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
    <div key={id} className="flex flex-row gap-6 py-4 sm:py-6">
      <img
        src={photoUrl ?? defaultImage}
        alt={`Foto de ${stageName}`}
        className="aspect-square w-[132px] rounded-2xl object-cover md:w-[229px]"
      />

      <div className="text-ecos-blue flex w-full flex-col gap-4 text-start">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold sm:text-2xl">{stageName}</h3>
          <p className="text-sm font-medium sm:text-xs">{genre}</p>
          <p className="line-clamp-7 text-sm break-words whitespace-pre-line">{description}</p>
        </div>

        <div>
          <Button
            children="Ver más"
            bgType="primary"
            type="button"
            onClick={goToMusicianProfile}
            className="w-full max-w-[120px] px-4 py-2.5 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default CardArtist;
