import defaultImage from "@/assets/imagePlay.svg";
import { CloseIcon } from "../ui/CloseIcon";
import { RepeatLeftIcon } from "../ui/RepeatLeftIcon";
import { RepeatRightIcon } from "../ui/RepeatRightIcon";
import { useState, useRef } from "react";
import DonationModal from "../DonationModal";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import ConfirmDialogModal from "@/shared/components/Modals/ConfirmDialogModal";
import { PauseIcon, PlayIcon } from "@/app/ui/Icons";
import { DonateButton } from "@/profile/components/DonateButton";

interface CardSongProps {
  id: number;
  title: string;
  artistId: number;
  stageName: string;
  photoUrl?: string;
  audioUrl: string;
}

const CardSongFavorite = ({
  id,
  title,
  artistId,
  stageName,
  photoUrl,
  audioUrl,
}: CardSongProps) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
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

  const handleDonationModal = () => {
    setIsDonationModalOpen(!isDonationModalOpen);
  };

  const handleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
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

  if (!isVisible) return null;

  return (
    <>
      <div className="group card-shadow relative max-w-[390px] justify-items-center space-y-6 rounded-[40px] bg-white px-[25px] py-[42px] sm:px-8 sm:py-10">
        <div className="w-full">
          <CloseIcon
            className="absolute top-5 right-5 z-10 h-[43px] w-[43px] cursor-pointer"
            onClick={handleConfirmModal}
          />
        </div>

        <img
          src={imageSrc}
          alt={`Imagen de ${stageName}`}
          className="mx-auto aspect-square w-full max-w-[320px] rounded-[42px] object-cover"
        />
        <div className="text-ecos-blue text-center text-2xl">
          <h3 className="text-center font-medium">{title}</h3>
          <p className="font-light">{stageName}</p>
        </div>

        <div className="text-ecos-orange flex items-center justify-center gap-3">
          <RepeatLeftIcon onClick={handleRewind} className="cursor-pointer" />
          {isPlaying ? (
            <PauseIcon
              onClick={handlePlayPause}
              className="bg-ecos-orange size-12 cursor-pointer rounded-full border-4 border-white stroke-white p-2"
            />
          ) : (
            <PlayIcon
              onClick={handlePlayPause}
              className="bg-ecos-orange size-12 cursor-pointer rounded-full border-4 border-white stroke-white p-2"
            />
          )}
          <RepeatRightIcon onClick={handleForward} className="cursor-pointer" />
        </div>

        <DonateButton
          children="Donar"
          className="button-primary flex h-14 w-full max-w-[194px] items-center justify-center gap-2.5 rounded-[37px] px-[41px] py-1.5"
          onClick={() => {
            handleDonationModal();
          }}
        />
      </div>

      {isConfirmModalOpen && (
        <ConfirmDialogModal
          onClose={handleConfirmModal}
          onConfirm={handleDelete}
          message={`¿Estás seguro de que deseas eliminar la canción "${title}" de tu lista de favoritos?`}
        />
      )}

      {isDonationModalOpen && <DonationModal artistId={artistId} onClose={handleDonationModal} />}

      <audio ref={audioRef} src={audioUrl} />
    </>
  );
};

export default CardSongFavorite;
