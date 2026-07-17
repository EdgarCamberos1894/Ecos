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
    <article className="group flex w-full max-w-[34.375rem] gap-5 rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-lg">
      <img
        src={photoUrl ?? defaultImage}
        alt={`Foto de ${stageName}`}
        className="aspect-square h-28 w-28 rounded-lg object-cover md:h-48 md:w-48 lg:h-52 lg:w-52"
      />

      <div className="text-ecos-blue flex min-w-0 flex-1 flex-col gap-5 text-start md:justify-between md:gap-0">
        <div className="flex flex-col gap-1">
          <p className="text-ecos-orange text-xs font-bold tracking-[0.12em] uppercase">{genre}</p>
          <h3 className="text-2xl font-bold">{stageName}</h3>
          <p className="line-clamp-4 text-sm leading-6 break-words whitespace-pre-line text-slate-600">
            {description}
          </p>
        </div>

        <div>
          <Button
            children="Ver contenido"
            bgType="primary"
            type="button"
            onClick={goToMusicianProfile}
            className="w-fit px-6 py-2.5"
          />
        </div>
      </div>
    </article>
  );
};

export default CardArtist;
