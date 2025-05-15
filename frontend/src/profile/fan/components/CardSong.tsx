import Button from "@/app/ui/Button";
import defaultImage from "@/assets/imagePlay.svg";
import { CloseIcon } from "../ui/CloseIcon";
import { NextIcon } from "../ui/NextIcon";
import { PlayIcon } from "../ui/PlayIcon";
import { PrevIcon } from "../ui/PrevIcon";
import { RepeatLeftIcon } from "../ui/RepeatLeftIcon";
import { RepeatRightIcon } from "../ui/RepeatRightIcon";
import DonateIcon from "../ui/DonateIcon";
import { useState, useRef } from "react";
import DonationModal from "../DonationModal";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { PauseIcon } from "../ui/PauseIcon";

interface CardSongProps {
  id: number;
  title: string;
  artistId: number;
  stageName: string;
  photoUrl?: string;
  audioUrl: string;
}

const CardSong = ({ id, title, artistId, stageName, photoUrl, audioUrl }: CardSongProps) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const imageSrc = photoUrl ?? defaultImage;

  const deleteSong = useApiMutation<unknown, undefined>(
    `/saved-songs/remove/${String(id)}`,
    "DELETE",
  );

  const handleDelete = () => {
    deleteSong.mutate(undefined, {
      onSuccess: () => {
        setIsVisible(false);
        toast.success("¡Canción eliminada con éxito!");
      },
      onError: (error) => {
        console.error("Error al eliminar la canción:", error);
        toast.error("Ocurrió un error al eliminar la canción. Intentá nuevamente.");
      },
    });
  };

  const handleOpenDonationModal = () => {
    setIsDonationModalOpen(true);
  };

  const handleCloseDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + 10,
      );
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = Math.max(0, audioRef.current.duration - 10);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="mx-auto w-full max-w-[390px] space-y-5">
        <div className="group relative space-y-8 rounded-[40px] border-4 border-[#9898A6] px-6 py-8 sm:px-8 sm:py-10">
          <CloseIcon
            className="absolute top-5 right-5 z-10 h-4 w-4 cursor-pointer"
            onClick={handleDelete}
          />
          <img
            src={imageSrc}
            alt={`Imagen de ${stageName}`}
            className="mx-auto aspect-square max-h-[320px] max-w-[320px] rounded-[42px] object-cover"
          />
          <div className="text-center">
            <h3 className="text-ecos-blue text-center text-xl">{title}</h3>
            <p className="text-ecos-dark-grey">{stageName}</p>
          </div>

          <div className="text-ecos-orange mt-4 flex cursor-pointer items-center justify-center gap-3">
            <PrevIcon onClick={handleRestart} />
            <RepeatLeftIcon onClick={handleRewind} />
            {isPlaying ? (
              <PauseIcon onClick={handlePlayPause} />
            ) : (
              <PlayIcon onClick={handlePlayPause} />
            )}
            <RepeatRightIcon onClick={handleForward} />
            <NextIcon onClick={handleStop} />
          </div>
        </div>

        <Button
          type="button"
          children="Donar"
          startIcon={<DonateIcon />}
          bgType="secondary"
          className="self-start text-white shadow-md"
          onClick={() => {
            handleOpenDonationModal();
          }}
        />
      </div>

      {isDonationModalOpen && (
        <DonationModal artistId={artistId} onClose={handleCloseDonationModal} />
      )}

      <audio ref={audioRef} src={audioUrl} />
    </>
  );
};

export default CardSong;
