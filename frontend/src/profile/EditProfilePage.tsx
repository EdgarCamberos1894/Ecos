import { useRef, useState } from "react";
import { useAuth } from "@/auth/hooks/use-auth";
import BannerUploader, { type BannerUploaderRef } from "./components/BannerUploader";
import { MediaEmbedForm } from "./components/MediaEmbedForm";
import { MusicUploader } from "./components/MusicUploader";
import CreateEventoCard from "./components/CreateEventCard";
import { useNavigate } from "react-router";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";

interface BannerUrl {
  bannerUrl: string | null;
}

interface MusicData {
  title: string;
  genre: string;
  sourceType: "SPOTIFY" | "FILE";
}

export const EditProfilePage = () => {
  const [musicData, setMusicData] = useState<MusicData>({
    title: "",
    genre: "",
    sourceType: "SPOTIFY",
  });

  const bannerRef = useRef<BannerUploaderRef>(null);

  const navigate = useNavigate();

  const { user } = useAuth();
  const id = user?.id ?? "";

  const { data } = useApiQuery<BannerUrl>("banner", `musician-profile/${id}/banner`, id);

  const { mutate } = useApiMutation<string, FormData>("/musician-profile/banner", "PUT");

  const handleSaveBanner = () => {
    const bannerData = bannerRef.current?.getBannerData();
    console.log("Banner file:", bannerData);

    if (!bannerData) return;

    const formData = new FormData();
    formData.append("banner", bannerData);
    formData.append("deleteBanner", "false");

    mutate(formData, {
      onSuccess: () => {
        toast.success("Banner guardado con éxito");
      },
      onError: () => {
        toast.error("Error al guardar el banner");
      },
    });
  };

  const handleSubmit = () => {
    console.log("Enviando musica");
  };

  return (
    <main className="mt-20 space-y-32">
      {JSON.stringify(musicData)}
      {JSON.stringify(data)}
      <BannerUploader ref={bannerRef} onSave={handleSaveBanner} previewImageUrl={data?.bannerUrl} />
      <section className="text-ecos-blue mb-24 ml-40 space-y-2">
        <h2 className="text-4xl">¡Bienvenido!</h2>
        <h1 className="text-8xl font-bold">{user?.name}</h1>
        <h4 className="mt-6 mb-10 text-2xl font-medium">Editar Panel</h4>
        <h3 className="text-2xl font-bold uppercase">
          Compartí tu música a través de spotify o subí tu archivo mp3/wav
        </h3>
        <section className="text-ecos-blue mt-12 mb-24 flex w-[777px] flex-col gap-9 rounded-2xl border px-4 py-3">
          <label htmlFor="title" className="flex flex-col gap-3.5 text-2xl">
            Título
            <input
              id="title"
              type="text"
              placeholder="Escribí el nombre del tema"
              value={musicData.title}
              onChange={(event) => {
                setMusicData({ ...musicData, title: event.target.value });
              }}
              className="border-ecos-dark-grey-light border px-6 py-3.5 text-lg focus:outline-none"
            />
            <p className="text-sm">El audio puede ser formato mp3 o wav</p>
          </label>
          <label htmlFor="genre" className="flex flex-col gap-3.5 text-2xl">
            Género
            <input
              id="genre"
              type="text"
              placeholder="Escribí a qué género pertenece tu canción"
              value={musicData.genre}
              onChange={(event) => {
                setMusicData({ ...musicData, genre: event.target.value });
              }}
              className="border-ecos-dark-grey-light border px-6 py-3.5 text-lg focus:outline-none"
            />
          </label>
          <label htmlFor="sourceType" className="flex flex-col gap-3.5 text-2xl">
            Elegí como subir tu música
            <div className="border-ecos-dark-grey-light border px-6 py-3.5 text-center">
              <select
                id="sourceType"
                value={musicData.sourceType}
                onChange={(event) => {
                  setMusicData({
                    ...musicData,
                    sourceType: event.target.value as MusicData["sourceType"],
                  });
                }}
                className="border-ecos-dark-grey w-[270px] appearance-none rounded-md border px-3.5 py-3 text-[22px] font-bold focus:outline-none"
              >
                <option value="SPOTIFY">Spotify</option>
                <option value="FILE">Mp3/Wav</option>
              </select>
            </div>
          </label>
          {musicData.sourceType === "SPOTIFY" ? (
            <MediaEmbedForm platform="spotify" />
          ) : (
            <MusicUploader />
          )}
          <div className="mb-2 flex gap-10">
            <button
              type="button"
              className="bg-ecos-orange-light text-ecos-blue rounded-full px-6 py-2.5"
            >
              Guardar
            </button>
            <button type="button" className="bg-ecos-blue rounded-full px-6 py-2.5 text-white">
              Cancelar
            </button>
          </div>
        </section>
        <section className="mb-32 space-y-9">
          <h3 className="text-2xl font-bold uppercase">Compartí tu VIDEOS a través de YOUTUBE</h3>
          <MediaEmbedForm platform="youtube" />
        </section>
        <CreateEventoCard />
      </section>
      <div className="mr-40 mb-24 flex justify-end gap-12">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-ecos-orange-light cursor-pointer rounded-full px-[120px] py-5 text-base text-white"
        >
          Guardar
        </button>
        <button
          type="button"
          className="bg-ecos-blue cursor-pointer rounded-full px-[120px] py-5 text-base text-white"
          onClick={() => navigate("/profile")}
        >
          Cancelar
        </button>
      </div>
    </main>
  );
};
