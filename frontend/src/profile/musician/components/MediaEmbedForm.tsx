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
        <YouTubeVideo
          embedUrl={embedUrl}
          className="aspect-[1126/567] min-h-[196px] w-full max-w-[1126px] rounded-[20px]"
        />
      )}
      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => {
            handleSetMusic(true);
          }}
          className="button-primary min-w-[112px] px-6 py-2.5 transition-colors"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleUnsetMusic}
          className="button-secondary min-w-[112px] px-6 py-2.5 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </>
  ) : (
    <div className="bg-ecos-media-embed text-ecos-blue flex w-full max-w-[762px] flex-col justify-start rounded-[20px] p-6">
      <h2 className="text-2xl font-medium">
        Publica tu {platform === "spotify" ? "música" : "video"}
      </h2>
      <p className="text-base">
        Copia y pega el enlace de tu {platform === "spotify" ? "canción" : "video"}
      </p>

      <div className="mt-5 rounded-[20px] border border-gray-400 px-6 pt-3.5 pb-[50px]">
        <label htmlFor="embed-input" className="text-sm text-gray-700">
          Pega el código de inserción
        </label>
        <textarea
          id="embed-input"
          className="mt-3.5 h-28 w-full resize-none rounded-[20px] border border-gray-300 p-4 text-sm"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>

      <div className="mt-6 flex gap-10">
        <button
          type="button"
          onClick={() => {
            handleSetMusic();
          }}
          className="button-primary min-h-10 min-w-[104px] px-6 py-2.5 transition-colors md:min-w-[119px]"
        >
          Insertar
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="button-secondary min-h-10 min-w-[104px] px-6 py-2.5 transition-colors md:min-w-[119px]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
