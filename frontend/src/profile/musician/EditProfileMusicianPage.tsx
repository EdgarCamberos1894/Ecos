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
import { type ApiSongs, type BannerUrl } from "./musician-types";
import { musicalGenreOptions as GENRES } from "../utils/musicalGenreOptions";
import { ArrowDown, FillArrowDown } from "@/app/ui/Icons";
import { SpotifyTrack } from "./components/SpotifyTrack";
import { AudioPlayer } from "./components/AudioPlayer";

export interface SettingMusic {
  url?: string;
  type?: MediaType;
  audio?: File;
  preview?: boolean;
}

interface MusicData {
  title: string;
  genre: string;
  sourceType: "SPOTIFY" | "FILE";
  audio?: File;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export const EditProfileMusicianPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);

  const [musicData, setMusicData] = useState<MusicData>({
    title: "",
    genre: "",
    sourceType: "SPOTIFY",
  });

  const [musicPreview, setMusicPreview] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const user = useRequiredUser();

  const { data: banner, refetch } = useApiQuery<BannerUrl>(
    "banner",
    `musician-profile/${user.id}/banner`,
    user.id,
  );

  const { data: songs, isSuccess } = useApiQuery<ApiSongs>(
    "songs",
    `songs/musician/${user.id}`,
    user.id,
  );

  const { mutate: bannerMutate, isPending: isBannerPending } = useApiMutation<string, FormData>(
    "/musician-profile/banner",
    "PUT",
  );

  const { mutate: songsMutate, isPending: isSongsPending } = useApiMutation<ApiSongs, FormData>(
    songs?.totalItems === 0 ? "/songs" : isSuccess ? `/songs/${songs.items[0].id.toString()}` : "",
    songs?.totalItems === 0 ? "POST" : "PUT",
  );

  const onImageUpload = (file: File | null, imageUrl: string | null) => {
    setFile(file);
    setImagePreview(imageUrl);
    setIsBannerUploaded(false);
  };

  const onSettingMusic = (settings: SettingMusic) => {
    const { url, type, audio, preview } = settings;

    if (preview && (audio || type === "spotify")) {
      if (!musicData.title || !musicData.genre) {
        toast.info("Los campos de título y género son obligatorios");
        return;
      }

      if (type === "spotify") {
        setMusicPreview(url);
      }

      if (audio) {
        const audioFileUrl = URL.createObjectURL(audio);
        setMusicPreview(audioFileUrl);
      }

      return;
    }

    if (preview && type === "youtube") {
      toast.info("El video está listo para guardarse");
    }

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

  const handleRemoveMusicPreview = () => {
    setMusicPreview(undefined);
    setMusicData({
      ...musicData,
      genre: "",
      sourceType: "SPOTIFY",
      title: "",
      audio: undefined,
      spotifyUrl: undefined,
    });
  };

  const handleRemoveVideoPreview = () => {
    setMusicData((prevMusicData) => {
      const { youtubeUrl: _, ...rest } = prevMusicData;
      return { ...rest };
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
        setIsBannerUploaded(true);
        refetch();
      },
      onError: () => {
        toast.error("Error al guardar el banner");
      },
    });
  };

  const handleBannerDelete = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (!musicData.title || !musicData.genre) {
      toast.info("Los campos de título y género son obligatorios");
      return;
    }

    if (!musicData.spotifyUrl && !musicData.audio) {
      toast.info("Agrega al menos un enlace de Spotify o sube un archivo");
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
        toast.success("Contenido guardado con éxito");
        navigate(`/profile/musician/${user.id}`);
      },
      onError: () => {
        toast.error("Error al guardar la música");
      },
    });
  };

  return (
    <main className="">
      <section className="justify-items-center xl:relative">
        <img
          src={banner?.bannerUrl ?? imagePreview ?? ImageBanner}
          alt={`Banner`}
          className="mb-10 hidden aspect-[1920/680] w-full object-cover 2xl:block"
        />
        {!isBannerUploaded && (
          <BannerUploader
            onUpload={handleBannerUpload}
            onDelete={handleBannerDelete}
            isUploading={isBannerPending}
            onImageUpload={onImageUpload}
            className="mb-4 flex min-h-[549px] w-full max-w-[734px] flex-col items-center justify-center justify-items-center gap-6 rounded-[30px] px-[25px] 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:z-10 2xl:mb-0 2xl:flex 2xl:-translate-x-1/2 2xl:-translate-y-1/2 2xl:bg-white"
          />
        )}
      </section>

      <section className="text-ecos-blue mb-24 space-y-2 px-4 sm:px-12 lg:px-44">
        <div className="mb-[63px] flex flex-col gap-6">
          <h2 className="text-[40px] font-medium">¡Bienvenido!</h2>
          <h1 className="text-[64px] font-medium break-words md:text-8xl">{user.name}</h1>
          <h4 className="text-2xl font-medium md:text-[32px]">Editar Panel</h4>
        </div>
        <h3 className="mb-6 text-2xl font-medium text-balance uppercase">
          Comparte tu música desde Spotify o sube tu archivo en formato MP3 o WAV
        </h3>
        <div className="flex flex-col gap-[70px]">
          {/* MUSIC */}
          {musicPreview ? (
            <div className="space-y-6">
              {musicPreview.includes("spotify") ? (
                <SpotifyTrack
                  embedUrl={musicPreview}
                  className="w-full max-w-screen-md rounded-2xl"
                />
              ) : (
                <AudioPlayer audioUrl={musicPreview} title={musicData.title} />
              )}
              <div className="mt-6 flex gap-10">
                <button
                  type="button"
                  onClick={() => toast.info("La canción está lista para guardarse")}
                  className="button-primary min-h-10 min-w-[104px] px-6 py-2.5 transition-colors md:min-w-[119px]"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleRemoveMusicPreview}
                  className="button-secondary min-h-10 min-w-[104px] px-6 py-2.5 transition-colors md:min-w-[119px]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <section className="text-ecos-blue flex min-h-[1018px] w-full max-w-[762px] flex-col gap-[43px] rounded-[20px] border px-4 py-[38px] md:px-6">
              <label htmlFor="title" className="flex flex-col gap-3.5 text-2xl">
                Título
                <input
                  id="title"
                  type="text"
                  placeholder="Escribe el nombre del tema"
                  value={musicData.title}
                  onChange={(event) => {
                    setMusicData({ ...musicData, title: event.target.value });
                  }}
                  className="border-ecos-dark-grey-light rounded-[15px] border px-6 py-3.5 text-lg focus:outline-none"
                />
                <p className="text-ecos-dark-grey text-base font-normal">
                  El audio debe estar en formato MP3 o WAV
                </p>
              </label>

              <label htmlFor="genre" className="flex flex-col gap-3.5 text-2xl">
                Género
                <div className="border-ecos-dark-grey-light w-full rounded-[15px] border px-6 py-3.5">
                  <div className="flex items-center justify-start sm:justify-center">
                    <select
                      id="genre"
                      value={musicData.genre}
                      onChange={(event) => {
                        setMusicData({ ...musicData, genre: event.target.value });
                      }}
                      className={`w-full max-w-[396px] appearance-none rounded-[5px] border border-[#333] px-3.5 py-3 pr-10 text-xs ${musicData.genre === "" ? "text-ecos-input-placeholder" : "text-[#333]"} focus:outline-none`}
                    >
                      <option value="" disabled>
                        Selecciona un género
                      </option>
                      {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                    <FillArrowDown className="text-ecos-dark-grey pointer-events-none -ml-8" />
                  </div>
                </div>
              </label>

              <label htmlFor="sourceType" className="flex flex-col gap-3.5 text-2xl">
                Elige dónde subir tu música
                <div className="border-ecos-dark-grey-light relative rounded-[20px] border px-6 py-3.5 text-center">
                  <div className="flex items-center justify-start sm:justify-center">
                    <select
                      id="sourceType"
                      value={musicData.sourceType}
                      onChange={(event) => {
                        setMusicData({
                          ...musicData,
                          sourceType: event.target.value as MusicData["sourceType"],
                        });
                      }}
                      className="border-ecos-dark-grey w-full max-w-[270px] appearance-none rounded-[5px] border px-3.5 py-3 text-[22px] font-bold focus:outline-none"
                    >
                      <option value="SPOTIFY">Spotify</option>
                      <option value="FILE">Mp3/Wav</option>
                    </select>
                    <ArrowDown className="text-ecos-dark-grey pointer-events-none -ml-10" />
                  </div>
                </div>
              </label>

              {musicData.sourceType === "SPOTIFY" ? (
                <MediaEmbedForm platform="spotify" onSettingMusic={onSettingMusic} />
              ) : (
                <MusicUploader onSettingMusic={onSettingMusic} />
              )}
            </section>
          )}

          {/* VIDEO */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold uppercase">Comparte tu VIDEO desde YOUTUBE</h3>
            <MediaEmbedForm
              platform="youtube"
              onSettingMusic={onSettingMusic}
              onRemovingMusic={handleRemoveVideoPreview}
            />
          </section>

          <CreateEventoCard />
        </div>
      </section>

      <div className="mb-24 flex justify-end gap-7 self-center px-4 sm:px-12 md:gap-[46px] lg:px-44">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSongsPending}
          className="button-primary min-h-[63px] min-w-[155px] px-6 py-2.5 text-base font-medium transition-colors md:min-w-[316px]"
        >
          {isSongsPending ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          className="button-secondary min-h-[63px] min-w-[155px] px-6 py-2.5 text-base font-medium transition-colors md:min-w-[316px]"
          onClick={() => navigate(`/profile/musician/${user.id}`)}
        >
          Cancelar
        </button>
      </div>
    </main>
  );
};
