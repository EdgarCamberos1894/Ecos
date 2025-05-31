import { useEffect, useState } from "react";
import { Avatar } from "@/app/ui/Icons";

interface ProfileImageProps {
  profileImage: string | File | null;
}

const ProfileImage = ({ profileImage }: ProfileImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!profileImage) {
      setImageSrc(null);
      return;
    }

    if (typeof profileImage === "string") {
      setImageSrc(profileImage);
    } else {
      const url = URL.createObjectURL(profileImage);
      setImageSrc(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [profileImage]);

  return (
    <div className="h-full w-fit">
      <div className="rounded-full">
        {imageSrc ? (
          <img
            src={imageSrc}
            className="h-60 w-60 rounded-full object-cover"
            alt="Image de perfil"
          />
        ) : (
          <Avatar className="h-60 w-60" detailColor="#FFFFFF" bgColor="var(--color-ecos-blue)" />
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
