import { PauseIcon, PlayIcon } from "@/app/ui/Icons";
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
    <div className="text-ecos-blue flex w-full items-center gap-4">
      {isPlaying ? (
        <button
          type="button"
          onClick={togglePlay}
          className="bg-ecos-blue focus-visible:outline-ecos-orange cursor-pointer rounded-full p-4 text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3"
        >
          <PauseIcon onClick={togglePlay} className="size-4 fill-white stroke-white" />
        </button>
      ) : (
        <button
          type="button"
          onClick={togglePlay}
          className="bg-ecos-blue focus-visible:outline-ecos-orange cursor-pointer rounded-full p-4 text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3"
        >
          <PlayIcon className="size-4 fill-white stroke-white" />
        </button>
      )}

      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <span className="truncate text-sm font-bold">{title}</span>
          <span className="shrink-0 text-xs text-slate-500">
            {formatTime(currentTime)} / {formatTime(duration || 270)}
          </span>
        </div>

        <div
          className="relative h-2 min-h-[8px] w-full cursor-pointer overflow-hidden rounded-full bg-slate-200"
          onClick={handleProgressClick}
        >
          <div
            className="bg-ecos-orange h-full"
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
