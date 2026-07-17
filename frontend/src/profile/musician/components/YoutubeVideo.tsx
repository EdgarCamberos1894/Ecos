import DemoVideo from "@/assets/Video_Ecos.mp4";

interface PlatformVideoProps {
  embedUrl: string;
  className?: string;
}

const toYouTubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const videoId =
      parsedUrl.hostname === "youtu.be"
        ? parsedUrl.pathname.slice(1)
        : (parsedUrl.searchParams.get("v") ?? parsedUrl.pathname.split("/").at(-1));

    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
};

export const YouTubeVideo = ({ embedUrl, className = "" }: PlatformVideoProps) => {
  if (embedUrl === "demo://ecos-showcase") {
    return <video className={className} src={DemoVideo} controls preload="metadata" playsInline />;
  }

  return (
    <iframe
      src={toYouTubeEmbedUrl(embedUrl)}
      title="YouTube video player"
      className={className}
      sandbox="allow-scripts allow-presentation allow-popups"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
};
