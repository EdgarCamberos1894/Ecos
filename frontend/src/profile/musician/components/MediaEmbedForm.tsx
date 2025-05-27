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
          <div className="flex gap-5">
            <button
              type="button"
              className="bg-ecos-blue min-w-[112px] rounded-[100px] px-6 py-2.5 text-white"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-ecos-blue border-ecos-blue min-w-[112px] rounded-[100px] border bg-white px-6 py-2.5"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <YouTubeVideo
            embedUrl={embedUrl}
            className="aspect-[1126/567] min-h-[196px] w-full max-w-[1126px] rounded-[20px]"
          />
          <div className="flex gap-5">
            <button
              type="button"
              className="bg-ecos-blue min-w-[112px] rounded-[100px] px-6 py-2.5 text-white"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-ecos-blue border-ecos-blue min-w-[112px] rounded-[100px] border bg-white px-6 py-2.5"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="bg-ecos-media-embed text-ecos-blue flex w-full max-w-[clamp(320px,90vw,743px)] flex-col justify-start rounded-[20px] p-6">
      <h2 className="text-2xl font-medium">Incrustar medio</h2>
      <p className="text-base">
        Comparte tu {platform === "spotify" ? "música" : "video"} música desde{" "}
        {platform === "spotify" ? "spotify" : "youtube"}
      </p>

      <div className="mt-5 rounded-[20px] border border-gray-400 px-6 pt-3.5 pb-[50px]">
        <label htmlFor="embed-input" className="text-sm text-gray-700">
          Pegá el código incrustado
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
          onClick={handleSetMusic}
          className="bg-ecos-blue min-h-10 min-w-[104px] cursor-pointer rounded-full px-6 py-2.5 text-white md:min-w-[119px]"
        >
          Incrustar
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="text-ecos-blue border-ecos-blue min-h-10 min-w-[104px] cursor-pointer rounded-full border bg-white px-6 py-2.5 md:min-w-[119px]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
