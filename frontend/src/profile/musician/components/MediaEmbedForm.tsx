import { type SettingMusic } from "@/profile/musician/EditProfileMusicianPage";
import { useMediaEmbed } from "@/profile/hooks/use-media-embed";
import { SpotifyTrack } from "./SpotifyTrack";
import { YouTubeVideo } from "./YoutubeVideo";

interface MediaEmbedFormProps {
  platform: "spotify" | "youtube";
  onSettingMusic?: (settings: SettingMusic) => void;
  onRemovingMusic?: () => void;
}

export const MediaEmbedForm = ({
  platform,
  onSettingMusic,
  onRemovingMusic,
}: MediaEmbedFormProps) => {
  const { input, embedUrl, mediaType, setInput, handleEmbed, handleCancel } =
    useMediaEmbed(platform);

  const handleSetMusic = (preview?: true) => {
    const { url, type } = handleEmbed();
    onSettingMusic?.({ url, type, preview });
  };

  const handleUnsetMusic = () => {
    handleCancel();
    onRemovingMusic?.();
  };

  return embedUrl ? (
    <>
      {mediaType === "spotify" ? (
        <SpotifyTrack embedUrl={embedUrl} />
      ) : (
        <YouTubeVideo embedUrl={embedUrl} className="aspect-video w-full rounded-lg" />
      )}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            handleSetMusic(true);
          }}
          className="button-primary px-5 py-2 text-sm transition-colors"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleUnsetMusic}
          className="button-secondary px-5 py-2 text-sm transition-colors"
        >
          Cancelar
        </button>
      </div>
    </>
  ) : (
    <div className="text-ecos-blue flex w-full flex-col justify-start rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h2 className="text-lg font-bold">
        {platform === "spotify" ? "Enlace de Spotify" : "Enlace de YouTube"}
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Pega el enlace o el codigo de insercion de tu {platform === "spotify" ? "cancion" : "video"}
        .
      </p>

      <div className="mt-4 rounded-lg border border-slate-300 bg-white p-4">
        <label htmlFor="embed-input" className="text-sm text-gray-700">
          Enlace o codigo de insercion
        </label>
        <textarea
          id="embed-input"
          className="focus:border-ecos-orange mt-2 h-24 w-full resize-none rounded-lg border border-slate-300 p-3 text-sm outline-none"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            handleSetMusic();
          }}
          className="button-primary px-5 py-2 text-sm transition-colors"
        >
          Insertar
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="button-secondary px-5 py-2 text-sm transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
