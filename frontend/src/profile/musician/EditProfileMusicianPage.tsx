import { useState } from "react";
import BannerUploader from "../components/BannerUploader";
import { MediaEmbedForm } from "./components/MediaEmbedForm";
import { MusicUploader } from "./components/MusicUploader";
import CreateEventoCard from "./components/CreateEventCard";
import { useNavigate } from "react-router";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import ImageBanner from "@/assets/imageBanner.webp";
import { MediaType } from "../utils/media-utils";

interface BannerUrl {
  bannerUrl: string | null;
}

export interface SettingMusic {
  url?: string;
  type?: MediaType;
  audio?: File;
}

interface MusicData {
  title: string;
  genre: string;
  sourceType: "SPOTIFY" | "FILE";
  audio?: File;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface ApiSongs {
  items: string[];
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
}

export const EditProfileMusicianPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [musicData, setMusicData] = useState<MusicData>({
    title: "",
    genre: "",
    sourceType: "SPOTIFY",
  });

  const navigate = useNavigate();

  const user = useRequiredUser();

  const { data: banner, refetch } = useApiQuery<BannerUrl>(
    "banner",
    `musician-profile/${user.id}/banner`,
    user.id,
  );

  const { data: songs } = useApiQuery<ApiSongs>("songs", `songs/musician/${user.id}`, user.id);

  const { mutate: bannerMutate, isPending: isBannerPending } = useApiMutation<string, FormData>(
    "/musician-profile/banner",
    "PUT",
  );

  const { mutate: songsMutate, isPending: isSongsPending } = useApiMutation<ApiSongs, FormData>(
    "/songs",
    songs?.totalItems === 0 ? "POST" : "PUT",
  );

  const onImageUpload = (file: File | null, imageUrl: string | null) => {
    setFile(file);
    setImagePreview(imageUrl);
  };

  const onSettingMusic = (settings: SettingMusic) => {
    const { url, type, audio } = settings;

    setMusicData((prevMusicData) => {
      if (type === "spotify") {
        const { audio: _, ...rest } = prevMusicData;
        return { ...rest, spotifyUrl: url };
      }

      if (type === "youtube") {
        return { ...prevMusicData, youtubeUrl: url };
      }

      if (prevMusicData.sourceType === "FILE") {
        const { spotifyUrl: _, ...rest } = prevMusicData;
        return { ...rest, audio };
      }

      return prevMusicData;
    });
  };

  const handleBannerUpload = () => {
    if (!file) {
      toast.info("Debes subir una imagen para poder guardarla");
      return;
    }

    const formData = new FormData();
    formData.append("banner", file);
    formData.append("deleteBanner", "false");

    bannerMutate(formData, {
      onSuccess: () => {
        toast.success("Banner guardado con éxito");
        refetch();
      },
      onError: () => {
        toast.error("Error al guardar el banner");
      },
    });
  };

  const handleSubmit = () => {
    if (!musicData.title || !musicData.genre) {
      toast.info("Los campos de título y género son obligatorios");
      return;
    }

    if (!musicData.spotifyUrl && !musicData.audio) {
      console.log(musicData);

      toast.info("Se debe agregar como mínimo un enlace de Spotify o subir un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("title", musicData.title);
    formData.append("genre", musicData.genre);
    formData.append("sourceType", musicData.sourceType);

    if (musicData.audio) {
      formData.append("audio", musicData.audio);
    }

    if (musicData.spotifyUrl) {
      formData.append("spotifyUrl", musicData.spotifyUrl);
    }

    if (musicData.youtubeUrl) {
      formData.append("youtubeUrl", musicData.youtubeUrl);
    }

    songsMutate(formData, {
      onSuccess: () => {
        toast.success("Música guardado con éxito");
        navigate("/profile");
      },
      onError: () => {
        toast.error("Error al guardar la música");
      },
    });
  };

  return (
    <main className="space-y-32">
      <section className="relative">
        <img
          src={banner?.bannerUrl ?? imagePreview ?? ImageBanner}
          alt={`Banner`}
          className="mb-10 max-h-[680px] w-full object-cover"
        />
        <BannerUploader
          onUpload={handleBannerUpload}
          isUploading={isBannerPending}
          onImageUpload={onImageUpload}
          className="absolute top-1/2 left-1/2 z-10 flex h-[454px] w-[734px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-7 bg-white/50"
        />
      </section>
      <section className="text-ecos-blue mb-24 ml-40 space-y-2">
        <h2 className="text-4xl">¡Bienvenido!</h2>
        <h1 className="text-8xl font-bold">{user.name}</h1>
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
            <MediaEmbedForm platform="spotify" onSettingMusic={onSettingMusic} />
          ) : (
            <MusicUploader onSettingMusic={onSettingMusic} />
          )}
        </section>
        <section className="mb-32 space-y-9">
          <h3 className="text-2xl font-bold uppercase">Compartí tu VIDEOS a través de YOUTUBE</h3>
          <MediaEmbedForm platform="youtube" onSettingMusic={onSettingMusic} />
        </section>
        <CreateEventoCard />
      </section>
      <div className="mr-40 mb-24 flex justify-end gap-12">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSongsPending}
          className="bg-ecos-orange-light cursor-pointer rounded-full px-[120px] py-5 text-base text-white"
        >
          {isSongsPending ? "Guardando" : "Guardar"}
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
