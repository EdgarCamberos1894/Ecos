import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import BannerUploader from "../components/BannerUploader";
import { MediaEmbedForm } from "./components/MediaEmbedForm";
import { MusicUploader } from "./components/MusicUploader";
import CreateEventoCard from "./components/CreateEventCard";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import ImageBanner from "@/assets/imageBanner.webp";
import { MediaType } from "../utils/media-utils";
import { type ApiSongs, type BannerUrl } from "./musician-types";
import { musicalGenreOptions as GENRES } from "../utils/musicalGenreOptions";
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
type PanelSection = "overview" | "banner" | "music" | "video" | "event";

const fieldClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-ecos-blue outline-none transition-colors focus:border-ecos-orange focus:ring-3 focus:ring-orange-100";
const panelSections: { id: PanelSection; label: string }[] = [
  { id: "overview", label: "Resumen" },
  { id: "banner", label: "Portada" },
  { id: "music", label: "Musica" },
  { id: "video", label: "Video" },
  { id: "event", label: "Eventos" },
];

export const EditProfileMusicianPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);
  const [musicData, setMusicData] = useState<MusicData>({
    title: "",
    genre: "",
    sourceType: "SPOTIFY",
  });
  const [musicPreview, setMusicPreview] = useState<string | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useRequiredUser();
  const requestedSection = searchParams.get("section");
  const activeSection: PanelSection = panelSections.some(({ id }) => id === requestedSection)
    ? (requestedSection as PanelSection)
    : "overview";

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
  const setActiveSection = (section: PanelSection) => {
    setSearchParams(section === "overview" ? {} : { section });
  };

  const onImageUpload = (nextFile: File | null, imageUrl: string | null) => {
    setFile(nextFile);
    setImagePreview(imageUrl);
    setIsBannerUploaded(false);
  };
  const onSettingMusic = ({ url, type, audio, preview }: SettingMusic) => {
    if (preview && (audio || type === "spotify")) {
      if (!musicData.title || !musicData.genre)
        return toast.info("Completa titulo y genero antes de previsualizar.");
      setMusicPreview(audio ? URL.createObjectURL(audio) : url);
      return;
    }
    if (preview && type === "youtube")
      return toast.success("El video esta listo para publicarse con tu lanzamiento.");
    setMusicData((current) => {
      if (type === "spotify") return { ...current, spotifyUrl: url, audio: undefined };
      if (type === "youtube") return { ...current, youtubeUrl: url };
      return current.sourceType === "FILE" ? { ...current, audio, spotifyUrl: undefined } : current;
    });
  };
  const handleRemoveMusicPreview = () => {
    setMusicPreview(undefined);
    setMusicData((current) => ({ ...current, audio: undefined, spotifyUrl: undefined }));
  };
  const handleBannerUpload = () => {
    if (!file) return toast.info("Selecciona una imagen antes de guardarla.");
    const formData = new FormData();
    formData.append("banner", file);
    formData.append("deleteBanner", "false");
    bannerMutate(formData, {
      onSuccess: () => {
        toast.success("Portada guardada.");
        setIsBannerUploaded(true);
        refetch();
      },
      onError: () => toast.error("No fue posible guardar la portada."),
    });
  };
  const handleSubmit = () => {
    if (!musicData.title || !musicData.genre)
      return toast.info("Completa el titulo y el genero de tu lanzamiento.");
    if (!musicData.spotifyUrl && !musicData.audio)
      return toast.info("Agrega un enlace de Spotify o un archivo de audio.");
    const formData = new FormData();
    formData.append("title", musicData.title);
    formData.append("genre", musicData.genre);
    formData.append("sourceType", musicData.sourceType);
    if (musicData.audio) formData.append("audio", musicData.audio);
    if (musicData.spotifyUrl) formData.append("spotifyUrl", musicData.spotifyUrl);
    if (musicData.youtubeUrl) formData.append("youtubeUrl", musicData.youtubeUrl);
    songsMutate(formData, {
      onSuccess: () => {
        toast.success("Lanzamiento publicado.");
        navigate(`/profile/musician/${user.id}`);
      },
      onError: () => toast.error("No fue posible publicar el lanzamiento."),
    });
  };

  const taskCards: {
    id: PanelSection;
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  }[] = [
    {
      id: "banner",
      eyebrow: "Identidad",
      title: "Actualizar portada",
      description: "Muestra una imagen que represente tu proyecto.",
      action: "Editar portada",
    },
    {
      id: "music",
      eyebrow: "Lanzamiento",
      title: "Publicar musica",
      description: "Agrega un tema desde Spotify o carga un archivo.",
      action: "Agregar musica",
    },
    {
      id: "video",
      eyebrow: "Contenido",
      title: "Agregar video",
      description: "Destaca una pieza visual junto a tu lanzamiento.",
      action: "Agregar video",
    },
    {
      id: "event",
      eyebrow: "Agenda",
      title: "Anunciar evento",
      description: "Comparte una fecha para que tu audiencia la encuentre.",
      action: "Crear evento",
    },
  ];

  return (
    <main className="bg-ecos-base-2 min-h-full pb-10">
      <section className="bg-ecos-blue text-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-end justify-between gap-5 px-4 py-7 sm:px-8 md:py-9 lg:px-10">
          <div>
            <p className="text-ecos-orange-light text-xs font-bold tracking-[0.16em] uppercase">
              Panel del artista
            </p>
            <h1 className="font-nunito mt-2 text-3xl font-bold sm:text-4xl">Hola, {user.name}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
              Elige una tarea y termina una cosa a la vez.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/profile/musician/${user.id}`)}
            className="button-secondary hover:text-ecos-blue border-white bg-transparent px-5 py-2.5 text-sm text-white hover:bg-white"
          >
            Ver mi perfil
          </button>
        </div>
      </section>
      <div className="mx-auto w-full max-w-screen-xl px-4 py-7 sm:px-8 md:py-9 lg:px-10">
        {activeSection !== "overview" && (
          <nav
            aria-label="Navegacion del panel"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4"
          >
            <button
              type="button"
              onClick={() => {
                setActiveSection("overview");
              }}
              className="text-ecos-blue decoration-ecos-orange text-sm font-bold underline underline-offset-4"
            >
              Volver al resumen
            </button>
            <label className="text-ecos-blue flex items-center gap-2 text-sm font-bold">
              Cambiar tarea
              <select
                value={activeSection}
                onChange={(event) => {
                  setActiveSection(event.target.value as PanelSection);
                }}
                className="focus:border-ecos-orange rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium outline-none"
              >
                {panelSections
                  .filter(({ id }) => id !== "overview")
                  .map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
              </select>
            </label>
          </nav>
        )}

        {activeSection === "overview" && (
          <section>
            <div className="mb-5 max-w-2xl">
              <p className="text-ecos-orange text-xs font-bold tracking-[0.16em] uppercase">
                Que quieres hacer hoy
              </p>
              <h2 className="font-nunito text-ecos-blue mt-1 text-2xl font-bold">
                Elige una tarea para empezar
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {taskCards.map((task) => (
                <article
                  key={task.id}
                  className="flex items-center justify-between gap-5 border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div>
                    <p className="text-ecos-orange text-xs font-bold tracking-[0.14em] uppercase">
                      {task.eyebrow}
                    </p>
                    <h3 className="text-ecos-blue mt-1 text-lg font-bold">{task.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-600">{task.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection(task.id);
                    }}
                    className="button-primary shrink-0 px-3 py-2 text-xs sm:px-4 sm:text-sm"
                  >
                    {task.action}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "banner" && (
          <section className="max-w-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-ecos-orange text-xs font-bold tracking-[0.16em] uppercase">
              Identidad visual
            </p>
            <h2 className="font-nunito text-ecos-blue mt-1 text-2xl font-bold">
              Portada de tu perfil
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Usa una imagen horizontal que ayude a reconocer tu proyecto.
            </p>
            <img
              src={banner?.bannerUrl ?? imagePreview ?? ImageBanner}
              alt="Vista previa de la portada"
              className="mt-5 aspect-[16/6] w-full rounded-lg object-cover"
            />
            {!isBannerUploaded && (
              <BannerUploader
                onUpload={handleBannerUpload}
                onDelete={() => {
                  setFile(null);
                }}
                isUploading={isBannerPending}
                onImageUpload={onImageUpload}
                className="mt-5"
              />
            )}
            {isBannerUploaded && (
              <button
                type="button"
                onClick={() => {
                  setIsBannerUploaded(false);
                }}
                className="button-secondary mt-5 px-4 py-2 text-sm"
              >
                Cambiar portada
              </button>
            )}
          </section>
        )}

        {activeSection === "music" && (
          <section className="max-w-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-ecos-orange text-xs font-bold tracking-[0.16em] uppercase">
              Nuevo lanzamiento
            </p>
            <h2 className="font-nunito text-ecos-blue mt-1 text-2xl font-bold">
              Publica una cancion
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Completa los datos y agrega una fuente de audio.
            </p>
            <div className="mt-6 space-y-5">
              <label className="text-ecos-blue block text-sm font-bold">
                Titulo
                <input
                  type="text"
                  placeholder="Nombre del tema"
                  value={musicData.title}
                  onChange={(event) => {
                    setMusicData({ ...musicData, title: event.target.value });
                  }}
                  className={`mt-2 ${fieldClassName}`}
                />
              </label>
              <label className="text-ecos-blue block text-sm font-bold">
                Genero
                <select
                  value={musicData.genre}
                  onChange={(event) => {
                    setMusicData({ ...musicData, genre: event.target.value });
                  }}
                  className={`mt-2 ${fieldClassName}`}
                >
                  <option value="" disabled>
                    Selecciona un genero
                  </option>
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-ecos-blue block text-sm font-bold">
                Origen
                <select
                  value={musicData.sourceType}
                  onChange={(event) => {
                    setMusicData({
                      ...musicData,
                      sourceType: event.target.value as MusicData["sourceType"],
                    });
                  }}
                  className={`mt-2 ${fieldClassName}`}
                >
                  <option value="SPOTIFY">Enlace de Spotify</option>
                  <option value="FILE">Archivo MP3 o WAV</option>
                </select>
              </label>
              {musicPreview ? (
                <div className="border-ecos-orange/30 space-y-4 rounded-lg border bg-orange-50 p-4">
                  <p className="text-ecos-blue text-sm font-bold">Vista previa lista</p>
                  {musicPreview.includes("spotify") ? (
                    <SpotifyTrack embedUrl={musicPreview} className="w-full" />
                  ) : (
                    <AudioPlayer audioUrl={musicPreview} title={musicData.title} />
                  )}
                  <button
                    type="button"
                    onClick={handleRemoveMusicPreview}
                    className="button-secondary px-4 py-2 text-sm"
                  >
                    Descartar vista previa
                  </button>
                </div>
              ) : musicData.sourceType === "SPOTIFY" ? (
                <MediaEmbedForm platform="spotify" onSettingMusic={onSettingMusic} />
              ) : (
                <MusicUploader onSettingMusic={onSettingMusic} />
              )}
            </div>
          </section>
        )}

        {activeSection === "video" && (
          <section className="max-w-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-ecos-orange text-xs font-bold tracking-[0.16em] uppercase">
              En pantalla
            </p>
            <h2 className="font-nunito text-ecos-blue mt-1 text-2xl font-bold">Video destacado</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              El video se publica junto a un lanzamiento. Puedes agregarlo ahora y completar la
              musica despues.
            </p>
            <div className="mt-6">
              <MediaEmbedForm
                platform="youtube"
                onSettingMusic={onSettingMusic}
                onRemovingMusic={() => {
                  setMusicData((current) => ({ ...current, youtubeUrl: undefined }));
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveSection("music");
              }}
              className="button-primary mt-6 px-4 py-2 text-sm"
            >
              Continuar con la musica
            </button>
          </section>
        )}

        {activeSection === "event" && (
          <div className="max-w-xl">
            <CreateEventoCard />
          </div>
        )}
      </div>
      {activeSection === "music" && (
        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-screen-xl flex-wrap justify-end gap-3 px-4 py-4 sm:px-8 lg:px-10">
            <button
              type="button"
              onClick={() => {
                setActiveSection("overview");
              }}
              className="button-secondary px-5 py-2.5 text-sm"
            >
              Volver al resumen
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSongsPending}
              className="button-primary px-5 py-2.5 text-sm"
            >
              {isSongsPending ? "Publicando..." : "Publicar lanzamiento"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
