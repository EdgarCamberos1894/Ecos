import { ComponentProps } from "react";

interface PlatformIframeProps extends ComponentProps<"iframe"> {
  embedUrl: string;
}

export const SpotifyTrack = ({ embedUrl, ...iframeProps }: PlatformIframeProps) => {
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="352"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
      {...iframeProps}
    />
  );
};
