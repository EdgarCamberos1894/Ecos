import { useEffect, useState } from "react";
import { Avatar } from "@/auth/components/ui/Avatar";

interface ProfileImagenProps {
  profileImage: string | File | null;
}

const ProfileImagen = ({ profileImage }: ProfileImagenProps) => {
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
      <div className="rounded-full bg-[#A8A8A8]">
        {imageSrc ? (
          <img
            src={imageSrc}
            className="h-60 w-60 rounded-full object-cover"
            alt="Imagen de perfil"
          />
        ) : (
          <Avatar className="h-60 w-60 p-16" />
        )}
      </div>
    </div>
  );
};

export default ProfileImagen;
