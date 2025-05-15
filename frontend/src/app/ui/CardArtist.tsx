import Button from "@/app/ui/Button";
import defaultImage from "@/assets/imagePlay.svg";

interface Musician {
  id: number;
  stageName: string;
  genre: string;
  photoUrl: string | null;
  description: string;
}

const CardArtist = ({ genre, musicians }: CardArtistProps) => {
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
          onClick={() => {
            goToMusicianProfile(id);
          }}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default CardArtist;
