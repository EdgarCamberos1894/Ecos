import { Avatar } from "@/auth/components/ui/Avatar";
import { useState } from "react";

const ProfileImagen = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col items-center justify-around">
        <div className="rounded-full bg-[#A8A8A8] p-16">
          {profileImage ? (
            <img src={profileImage} className="h-44 w-44 rounded-full object-cover" />
          ) : (
            <Avatar className="h-44 w-44" />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileImagen;
