import { useAuth } from "@/auth/hooks/use-auth";
import BannerUploader from "./components/BannerUploader";
import { MediaEmbedForm } from "./components/MediaEmbedForm";
import { MusicUploader } from "./components/MusicUploader";
import CreateEventoCard from "./components/CreateEventCard";

export const EditProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <BannerUploader />
      <div className="mb-24 ml-40 space-y-2">
        <h1 className="text-8xl font-bold">{user?.name}</h1>
        <h4 className="mt-6 mb-10 text-2xl font-medium">Editar Panel</h4>
        <h3 className="text-2xl font-bold uppercase">
          Compartí tu música a través de spotify o subí tu archivo mp3/wav
        </h3>
        <section className="mt-12 flex items-start gap-32">
          <MediaEmbedForm platform="spotify" />
          <MusicUploader />
        </section>
        <h3 className="text-2xl font-bold uppercase">Compartí tu VIDEOS a través de YOUTUBE</h3>
        <MediaEmbedForm platform="youtube" />
        <CreateEventoCard />
      </div>
    </>
  );
};
