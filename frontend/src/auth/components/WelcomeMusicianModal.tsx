import Button from "@/app/ui/Button";
import Modal from "@/app/ui/Modal";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import ProfileMusicianModal from "@/profiles/components/profileMusicianModal/ProfileMusicianModal";

interface WelcomeMusicianProps {
  onClose: () => void;
}

const WelcomeMusicianModal = ({ onClose }: WelcomeMusicianProps) => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  if (!user) return null;

  return (
    <>
      <Modal
        onClose={onClose}
        firstNormalText="Registrate en "
        highlightedText="ECOS"
        secondNormalText="como músico"
        className="h-max w-fit md:w-3/5"
      >
        <div className="p-20">
          <h1 className="mb-2.5 text-5xl font-medium">¡BIENVENIDO!</h1>
          <h2 className="mb-2.5 text-3xl">{user.name}</h2>
          <h3 className="mb-40 text-2xl">Empecemos a editar tu panel</h3>
          <div className="flex w-full gap-6">
            <Button
              children="CONTINUAR"
              onClick={() => {
                setOpenModal(true);
              }}
              className="bg-[#6E6E6E] text-white"
            />
            <Button children="CANCELAR" onClick={onClose} className="bg-[#B1B1B1] text-white" />
          </div>
        </div>
      </Modal>
      {openModal && <ProfileMusicianModal onClose={onClose} />}
    </>
  );
};

export default WelcomeMusicianModal;
