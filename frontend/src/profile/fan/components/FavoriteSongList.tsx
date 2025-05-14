import Button from "@/app/ui/Button";
import CardPlay from "./CardPlay";

const FavoriteSongList = () => {
  return (
    <div className="text-ecos-blue flex flex-col items-center">
      <h2 className="text-4xl font-medium">TU LISTA DE FAVORITOS</h2>
      <CardPlay />
      <Button children="VER MÁS" bgType="primary" className="mt-9 px-6 py-2.5" />
    </div>
  );
};

export default FavoriteSongList;
