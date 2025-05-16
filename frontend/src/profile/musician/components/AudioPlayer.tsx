import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export const AudioPlayer = ({ audioUrl, title }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current?.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = clickX / width;
    audioRef.current.currentTime = clickRatio * duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  return (
    <div className="text-ecos-blue flex w-full max-w-screen-md items-center gap-4">
      <button
        type="button"
        onClick={togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <div className="flex w-full max-w-md flex-col gap-1">
        <div className="flex items-center gap-8">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration || 270)}
          </span>
        </div>

        <div
          className="relative h-2 min-h-[11px] w-full max-w-[404px] cursor-pointer rounded bg-gray-300"
          onClick={handleProgressClick}
        >
          <div
            className="bg-ecos-blue h-full rounded"
            style={{ width: `${((currentTime / duration) * 100 || 0).toString()}%` }}
          ></div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};
