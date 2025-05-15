import Button from "@/app/ui/Button";
import { useNavigate } from "react-router";
import defaultImage from "@/assets/imagePlay.svg";

interface Musician {
  idMusician: number;
  stageName: string;
  genre: string;
  photoUrl: string | null;
  /*description: string;*/
}

interface CardFeaturedArtistsProps {
  genre: string;
  musicians: Musician[];
}

const CardFeaturedArtists = ({ genre, musicians }: CardFeaturedArtistsProps) => {
  const navigate = useNavigate();

  const goToMusicianProfile = (idMusician: number) => {
    navigate(`/musician-profile/${String(idMusician)}`);
  };

  const filteredMusicians = musicians.filter((musician) => musician.genre === genre);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
      {/*{filteredMusicians.map(({ idMusician, stageName, genre, {/*description*/}
      {filteredMusicians.map(({ idMusician, stageName, photoUrl, genre }) => (
        <div key={idMusician} className="flex gap-4 rounded-lg px-6 py-2">
          <img src={photoUrl ?? defaultImage} alt="image" className="h-42 w-42 rounded-xl" />

          <div className="flex flex-col gap-4 text-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold">{stageName}</h3>
              <p className="text-xs text-[#49454F]">{genre}</p>
              {/*<p className="line-clamp-7 text-sm whitespace-pre-line text-gray-600">
                {description}
              </p>*/}
            </div>
            <Button
              children="Ver más"
              bgType="primary"
              type="button"
              onClick={() => {
                goToMusicianProfile(idMusician);
              }}
              className="text-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFeaturedArtists;
