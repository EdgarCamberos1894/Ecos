import { useEffect, useRef, useState } from "react";
import { SongList } from "./types/SongList";
import CardSong from "./CardSong";
import { ArrowScroll } from "@/app/ui/Icons";

interface SongsGridProps {
  songs?: SongList[];
  onFavoriteAdded?: () => void;
}

const emptySongs: SongList[] = [];

const SongsGrid = ({ songs = emptySongs, onFavoriteAdded }: SongsGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      const newScrollLeft = Math.min(container.scrollLeft + scrollAmount, maxScrollLeft);
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    } else {
      const newScrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    };

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative overflow-visible">
      <div ref={containerRef} className="w-full">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {songs.map((song) => (
            <CardSong
              key={song.id}
              song={song}
              isPlaying={playingId === String(song.id)}
              onPlay={() => {
                setPlayingId(String(song.id));
              }}
              onPause={() => {
                setPlayingId(null);
              }}
              onFavoriteAdded={onFavoriteAdded}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          scroll("left");
        }}
        disabled={!canScrollLeft}
        className="hidden"
      >
        <ArrowScroll className="h-6 w-6 rotate-180" />
      </button>

      <button
        type="button"
        onClick={() => {
          scroll("right");
        }}
        disabled={!canScrollRight}
        className="hidden"
      >
        <ArrowScroll className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SongsGrid;
