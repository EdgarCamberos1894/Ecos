import { type SettingMusic } from "@/profile/musician/EditProfileMusicianPage";
import { useMediaEmbed } from "@/profile/hooks/use-media-embed";
import { SpotifyTrack } from "./SpotifyTrack";
import { YouTubeVideo } from "./YoutubeVideo";

interface MediaEmbedFormProps {
  platform: "spotify" | "youtube";
  onSettingMusic?: (settings: SettingMusic) => void;
}

export const MediaEmbedForm = ({ platform, onSettingMusic }: MediaEmbedFormProps) => {
  const { input, embedUrl, mediaType, setInput, handleEmbed, handleCancel } =
    useMediaEmbed(platform);

  const handleSetMusic = () => {
    const { url, type } = handleEmbed();
    onSettingMusic?.({ url, type });
  };

  return embedUrl ? (
    <>
      {mediaType === "spotify" ? (
        <>
          <SpotifyTrack embedUrl={embedUrl} />
          <div className="mb-2 flex gap-10">
            <button
              type="button"
              className="bg-ecos-orange-light text-ecos-blue rounded-full px-6 py-2.5"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-ecos-blue rounded-full px-6 py-2.5 text-white"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-9">
          <YouTubeVideo
            embedUrl={embedUrl}
            className="aspect-[1126/567] max-h-[567px] min-h-[196px] w-full max-w-[1126px] min-w-[358px] rounded-[20px]"
          />
          <div className="mb-2 flex gap-10">
            <button
              type="button"
              className="bg-ecos-orange-light text-ecos-blue rounded-full px-6 py-2.5"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-ecos-blue rounded-full px-6 py-2.5 text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="flex w-full max-w-[clamp(320px,90vw,743px)] flex-col justify-start rounded-[20px] bg-[#F2F2F2] p-6">
      <h2 className="text-lg font-semibold text-black">Incrustar medio</h2>
      <p className="mt-1 text-sm text-gray-600">
        Comparte tu música a través de {platform === "spotify" ? "spotify" : "youtube"}
      </p>

      <div className="mt-5 rounded-[20px] border border-gray-400 p-4">
        <label htmlFor="embed-input" className="text-sm text-gray-700">
          Pegá el código incrustado
        </label>
        <textarea
          id="embed-input"
          className="mt-2 h-28 w-full resize-none rounded-[20px] border border-gray-300 p-2 text-sm"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={handleSetMusic}
          className="bg-ecos-orange-light text-ecos-blue rounded-full px-6 py-2.5"
        >
          Incrustar
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-ecos-blue rounded-full px-6 py-2.5 text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
