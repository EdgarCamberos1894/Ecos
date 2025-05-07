export type MediaType = "spotify" | "youtube" | "unknown";

const detectMediaType = (input: string, platform: string): MediaType => {
  if (input.includes("spotify.com") && platform === "spotify") return "spotify";
  if (platform === "youtube" && (input.includes("youtube.com") || input.includes("youtu.be")))
    return "youtube";
  return "unknown";
};

const cleanSpotifyUrl = (url: string): string => {
  return url.replace(/spotify\.com\/intl-[a-z]{2}\//, "spotify.com/");
};

export const extractEmbedUrl = (
  input: string,
  platform: string,
): { url: string | null; type: MediaType } => {
  const type = detectMediaType(input, platform);
  const cleanedInput = type === "spotify" ? cleanSpotifyUrl(input) : input;

  if (type === "spotify") {
    const match = /spotify\.com\/(track|playlist|album|artist)\/([\w\d]+)/.exec(cleanedInput);
    if (match) {
      return {
        url: `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator`,
        type,
      };
    }
  }

  if (type === "youtube") {
    const videoId = cleanedInput.includes("youtu.be")
      ? cleanedInput.split("/").pop()
      : new URLSearchParams(new URL(cleanedInput).search).get("v");
    if (videoId) {
      return {
        url: `https://www.youtube.com/embed/${videoId}`,
        type,
      };
    }
  }

  if (!cleanedInput.startsWith("http")) {
    return { url: null, type: "unknown" };
  }

  return { url: null, type: "unknown" };
};
