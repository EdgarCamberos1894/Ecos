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
      >
        <h1>¡BIENVENIDO!</h1>
        <h2>{user.name}</h2>
        <h3>Empecemos a editar tu panel</h3>
        <div>
          <Button
            children="CONTINUAR"
            onClick={() => {
              setOpenModal(true);
            }}
          />
          <Button children="CANCELAR" onClick={onClose} />
        </div>
      </Modal>
      {openModal && <ProfileMusicianModal onClose={onClose} />}
    </>
  );
};

export default WelcomeMusicianModal;
