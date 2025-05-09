interface PlatformIframeProps {
  embedUrl: string;
}

export const SpotifyTrack = ({ embedUrl }: PlatformIframeProps) => {
  return (
    <iframe
      className="mt-4 rounded-xl"
      src={embedUrl}
      width="100%"
      height="352"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
    />
  );
};
