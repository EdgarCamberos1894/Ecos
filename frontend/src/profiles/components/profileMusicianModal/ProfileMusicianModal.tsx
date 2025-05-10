import Modal from "@/app/ui/Modal";
import { useAuth } from "@/auth/hooks/use-auth";
import FormMusicianProfile from "./components/FormMusicianProfile";

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileMusicianModal = ({ onClose }: ProfileModalProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Modal
      onClose={onClose}
      firstNormalText={"Registrate en "}
      highlightedText={"ECOS"}
      secondNormalText={" como músico"}
      className="h-fit w-fit items-center justify-center overflow-y-auto md:h-full md:w-3/5"
    >
      <FormMusicianProfile onClose={onClose} />
    </Modal>
  );
};

export default ProfileMusicianModal;
