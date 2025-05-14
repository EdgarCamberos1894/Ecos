import Button from "@/app/ui/Button";
import Modal from "@/app/ui/Modal";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import ProfileUserModal from "@/profile/components/ProfileUserModal";
import logov1 from "@/assets/logo_V1-1.webp";

interface WelcomeUserProps {
  onClose: () => void;
}

const WelcomeUserModal = ({ onClose }: WelcomeUserProps) => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  if (!user) return null;

  return (
    <>
      <Modal
        onClose={onClose}
        firstNormalText="Registrate en "
        highlightedText="ECOS"
        secondNormalText={user.role === "MUSICIAN" ? "como Músico" : "como Fan"}
        className="h-max w-min md:w-3/5"
      >
        <div className="flex flex-col items-start justify-around p-2 md:p-10 lg:p-20">
          <h1 className="mb-4 text-5xl font-medium">¡BIENVENIDO!</h1>
          <h2 className="mb-4 text-3xl">{user.name}</h2>
          <h3 className="mb-8 text-2xl lg:mb-40">Empecemos a editar tu panel</h3>
          <div className="flex w-full gap-6 pb-10 lg:pb-20">
            <Button
              children="CONTINUAR"
              bgType="primary"
              onClick={() => {
                setOpenModal(true);
              }}
              className="text-white"
            />
            <Button
              children="CANCELAR"
              onClick={onClose}
              className="text-white"
              bgType="secondary"
            />
          </div>
          <img src={logov1} alt="Ecos logo" className="w-3/5 self-center lg:max-w-96 lg:self-end" />
        </div>
      </Modal>
      {openModal && <ProfileUserModal onClose={onClose} />}
    </>
  );
};

export default WelcomeUserModal;
