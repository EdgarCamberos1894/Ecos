interface PlatformIframeProps {
  embedUrl: string;
}

export const YouTubeVideo = ({ embedUrl }: PlatformIframeProps) => {
  return (
    <iframe
      className="mt-4 rounded-xl border-none"
      width="720"
      height="405"
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
    />
  );
};
