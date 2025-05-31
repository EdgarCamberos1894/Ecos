import { useState } from "react";
import { extractEmbedUrl, type MediaType } from "../utils/media-utils";
import { toast } from "sonner";

export const useMediaEmbed = (platform: string) => {
  const [input, setInput] = useState<string>("");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType>("unknown");

  const handleEmbed = () => {
    const { url, type } = extractEmbedUrl(input, platform);

    if (url) {
      setEmbedUrl(url);
      setMediaType(type);
    } else {
      toast.error(`No se pudo detectar un link válido de ${platform}`);
    }

    return { url, type };
  };

  const handleCancel = () => {
    setInput("");
    setEmbedUrl(null);
    setMediaType("unknown");
  };

  return {
    input,
    embedUrl,
    mediaType,
    setInput,
    handleEmbed,
    handleCancel,
  };
};
