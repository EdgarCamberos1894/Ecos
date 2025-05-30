import Modal from "@/app/ui/Modal";
import { useAuth } from "@/auth/hooks/use-auth";
import FormMusicianProfile from "./forms/FormMusicianProfile";
import FormFanProfile from "./forms/FormFanProfile";

interface ProfileModalProps {
  onClose: () => void;
  openFromUserMenu?: boolean;
}

const ProfileUserModal = ({ onClose, openFromUserMenu }: ProfileModalProps) => {
  const { user } = useAuth();
  const role = user?.role;

  if (!user) return null;

  return (
    <Modal
      onClose={onClose}
      firstNormalText={openFromUserMenu ? "Edita tu perfil en" : "Registrate en "}
      highlightedText={"ECOS"}
      secondNormalText={
        !openFromUserMenu ? (user.role === "MUSICIAN" ? "como músico" : "como fan") : undefined
      }
      className="h-full w-full max-w-[1080px] items-center justify-center overflow-y-auto"
    >
      {role === "MUSICIAN" && <FormMusicianProfile onClose={onClose} />}
      {role === "FAN" && <FormFanProfile onClose={onClose} />}
    </Modal>
  );
};

export default ProfileUserModal;
