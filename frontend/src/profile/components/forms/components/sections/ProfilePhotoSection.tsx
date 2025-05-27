import ProfileImage from "../profilePhotoModal/components/ProfileImage";
import { Avatar } from "@/auth/components/ui/Icons";
import { Edit } from "../../../ui/Icons";
import { useState } from "react";
import ProfilePhotoModal from "../profilePhotoModal/ProfilePhotoModal";

interface ProfilePhotoProps {
  profileImage: File | string | null;
  onImageChange: (file: File | null) => void;
  className?: string;
}

const ProfilePhotoSection = ({ profileImage, onImageChange, className }: ProfilePhotoProps) => {
  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);

  const handleCloseModal = () => {
    setOpenProfileImageModal(false);
  };

  const handleProfileImageChange = (file: File | null) => {
    onImageChange(file);
    handleCloseModal();
  };

  return (
    <fieldset className={`fieldsetSectionProfile ${className ?? ""}`}>
      <legend className="legendSectionProfile">FOTO DE PERFIL</legend>
      <div className="relative">
        <div className="h-60 w-60 rounded-full">
          {profileImage ? (
            <ProfileImage profileImage={profileImage} />
          ) : (
            <Avatar className="h-60 w-60" detailColor="#FFFFFF" bgColor="var(--color-ecos-blue)" />
          )}
        </div>
        <button
          type="button"
          className="bg-ecos-base absolute right-14 -bottom-6 flex h-20 w-20 items-center justify-center rounded-full drop-shadow-md"
          onClick={() => {
            setOpenProfileImageModal(true);
          }}
        >
          <Edit className="stroke-ecos-blue" />
        </button>
      </div>

      {openProfileImageModal && (
        <ProfilePhotoModal
          mode="edit"
          open={true}
          onClose={handleCloseModal}
          openProfileImage={handleProfileImageChange}
          currentImage={
            profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage
          }
        />
      )}
    </fieldset>
  );
};

export default ProfilePhotoSection;
