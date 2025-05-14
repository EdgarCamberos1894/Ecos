import Modal from "@/app/ui/Modal";
import { useAuth } from "@/auth/hooks/use-auth";
import FormMusicianProfile from "./forms/FormMusicianProfile";
import FormFanProfile from "./forms/FormFanProfile";

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileUserModal = ({ onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const role = user?.role;

  if (!user) return null;

  console.log("User role:", role);

  return (
    <Modal
      onClose={onClose}
      firstNormalText={"Registrate en "}
      highlightedText={"ECOS"}
      secondNormalText={" como músico"}
      className="h-full w-min items-center justify-center overflow-y-auto md:w-3/5"
    >
      {role === "MUSICIAN" && <FormMusicianProfile onClose={onClose} />}
      {role === "FAN" && <FormFanProfile onClose={onClose} />}
    </Modal>
  );
};

export default ProfileUserModal;
