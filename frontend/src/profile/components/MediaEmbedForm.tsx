import { useMediaEmbed } from "../hooks/use-media-embed";
import { SpotifyTrack } from "./SpotifyTrack";
import { YouTubeVideo } from "./YoutubeVideo";

interface MediaEmbedFormProps {
  platform: "spotify" | "youtube";
}

export const MediaEmbedForm = ({ platform }: MediaEmbedFormProps) => {
  const { input, embedUrl, mediaType, setInput, handleEmbed, handleCancel } =
    useMediaEmbed(platform);

  return embedUrl ? (
    <div className="h-[504px] w-[772px] p-6">
      {mediaType === "spotify" ? (
        <SpotifyTrack embedUrl={embedUrl} />
      ) : (
        <YouTubeVideo embedUrl={embedUrl} />
      )}
    </div>
  ) : (
    <div className="mb-20 flex h-[504px] w-[772px] flex-col justify-start rounded-xl bg-gray-100 p-6">
      <h2 className="text-lg font-semibold text-black">Incrustar medio</h2>
      <p className="mt-1 text-sm text-gray-600">
        Comparte tu música a través de {platform === "spotify" ? "spotify" : "youtube"}
      </p>

      <div className="mt-5 border border-gray-400 p-4">
        <label htmlFor="embed-input" className="text-sm text-gray-700">
          Pegá el código incrustado
        </label>
        <textarea
          id="embed-input"
          className="mt-2 h-28 w-full resize-none rounded-sm border border-gray-300 p-2 text-sm"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={handleEmbed}
          className="rounded-md bg-[#625A67] px-6 py-2 text-sm text-white"
        >
          Incrustar
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md bg-gray-300 px-6 py-2 text-sm text-gray-800"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
