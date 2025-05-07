import { useAuth } from "@/auth/hooks/use-auth";
import BannerUploader from "./components/BannerUploader";
import { MediaEmbedForm } from "./components/MediaEmbedForm";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <BannerUploader />
      <div className="mb-24 ml-40 space-y-2">
        <h2 className="text-4xl font-bold">¡Bienvenido!</h2>
        <h1 className="text-8xl font-bold">{user?.name}</h1>
        <h4 className="mt-6 mb-10 text-2xl font-medium">Editar Panel</h4>
        <h3 className="text-2xl font-bold uppercase">
          Compartí tu música a través de spotify o subí tu archivo mp3/wav
        </h3>
        <MediaEmbedForm platform="spotify" />
        <h3 className="text-2xl font-bold uppercase">Compartí tu VIDEOS a través de YOUTUBE</h3>
        <MediaEmbedForm platform="youtube" />
      </div>
    </>
  );
}
