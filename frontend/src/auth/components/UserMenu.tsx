import { useState, useEffect } from "react";
import { useAuth } from "@/auth/hooks/use-auth";
import { useNavigate } from "react-router";
import { Avatar } from "@/auth/components/ui/Avatar";
import { EditContainer } from "./ui/EditContainer";
import { Logout } from "./ui/Logout";
import { Settings } from "./ui/Settings";
import ProfileUserModal from "@/profile/components/ProfileUserModal";
import { useProfileData } from "../hooks/useProfileData";
import { Musician, Fan } from "../types";
import { UserProfileIcon } from "./ui/UserProfileIcon";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isOpenPerfilModal, setIsOpenPerfilModal] = useState(false);
  const id = user?.id ?? "";

  const profileType = user?.role === "MUSICIAN" ? "musician" : "fan";
  const endpoint = user?.role === "MUSICIAN" ? `musician-profile/${id}` : `fan-profile/${id}`;

  const { data: profile, refetch } = useProfileData<Musician | Fan>(profileType, id, endpoint);

  const [profileImage, setProfileImage] = useState<string | undefined>(profile?.photoUrl);

  useEffect(() => {
    if (profile?.photoUrl) {
      setProfileImage(profile.photoUrl);
    }
    refetch();
  }, [profile, refetch]);

  const handleLogOut = () => {
    handleLogout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  if (!user) return null;

  return (
    <>
      <div className="relative inline-block">
        <button type="button" onClick={toggleMenu}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <Avatar />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 mt-4 flex h-[450px] w-80 flex-col items-center justify-around bg-white text-2xl shadow-lg">
            <h2 className="leading-5 font-medium tracking-tight uppercase">{user.name}</h2>
            <div className="flex flex-col items-start gap-6">
              <button
                type="button"
                onClick={() => {
                  navigate(`/profile/${user.role.toLowerCase()}/${id}`);
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center gap-5 leading-1"
              >
                <UserProfileIcon className="size-8" />
                Mi perfil
              </button>

              <button
                type="button"
                onClick={() => {
                  if (user.role === "MUSICIAN") {
                    navigate("/profile/musician/edit");
                  } else {
                    setIsOpenPerfilModal(true);
                  }
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center gap-5 leading-1"
              >
                <EditContainer className="size-8" />
                Editar perfil
              </button>

              {user.role === "MUSICIAN" && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenPerfilModal(true);
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-5 leading-1"
                >
                  <Settings className="size-8" />
                  Configuración
                </button>
              )}

              <button
                onClick={handleLogOut}
                type="button"
                className="flex cursor-pointer items-center gap-5 leading-1"
              >
                <Logout className="size-8" />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {isOpenPerfilModal && (
        <ProfileUserModal
          onClose={() => {
            setIsOpenPerfilModal(false);
          }}
        />
      )}
    </>
  );
};

export default UserMenu;
