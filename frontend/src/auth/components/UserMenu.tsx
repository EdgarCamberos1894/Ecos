import { useState, useEffect } from "react";
import { useAuth } from "@/auth/hooks/use-auth";
import { useNavigate } from "react-router";
import { Avatar, Logout, UserProfileIcon, EditContainer } from "@/app/ui/Icons";
import ProfileUserModal from "@/profile/components/ProfileUserModal";
import { useProfileData } from "../hooks/useProfileData";
import { Musician, Fan } from "../types";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const [isOpenPerfilModal, setIsOpenProfileModal] = useState(false);

  const navigate = useNavigate();
  const id = user?.id ?? "";

  const profileType = user?.role === "MUSICIAN" ? "musician" : "fan";
  const endpoint = user?.role === "MUSICIAN" ? `musician-profile/${id}` : `fan-profile/${id}`;

  const { data: profile } = useProfileData<Musician | Fan>(profileType, id, endpoint);

  const [profileImage, setProfileImage] = useState<string | undefined>(profile?.photoUrl);

  useEffect(() => {
    setProfileImage(profile?.photoUrl);
  }, [profile]);

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
      <div className="relative">
        <button type="button" onClick={toggleMenu}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="size-[65px] cursor-pointer rounded-full object-cover"
            />
          ) : (
            <Avatar className="m-5 cursor-pointer" />
          )}
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-10" onClick={toggleMenu}>
            <div
              className="absolute top-22 right-1 z-10 mt-4 w-64 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-xl xl:top-32"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <h2 className="text-ecos-blue border-b border-slate-200 px-3 py-3 font-bold tracking-normal">
                {user.name}
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/profile/${user.role.toLowerCase()}/${id}`);
                    setIsOpen(false);
                  }}
                  className="text-ecos-blue flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-medium transition-colors hover:bg-slate-100"
                >
                  <UserProfileIcon className="size-5" />
                  Mi perfil
                </button>

                {user.role === "MUSICIAN" && (
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/profile/musician/edit?section=overview");
                      setIsOpen(false);
                    }}
                    className="text-ecos-blue flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-medium transition-colors hover:bg-slate-100"
                  >
                    <EditContainer className="size-5" />
                    Panel del artista
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsOpenProfileModal(true);
                    setIsOpen(false);
                  }}
                  className="text-ecos-blue flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-medium transition-colors hover:bg-slate-100"
                >
                  <EditContainer className="size-5" />
                  Editar perfil
                </button>

                <button
                  onClick={handleLogOut}
                  type="button"
                  className="text-ecos-blue flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-medium transition-colors hover:bg-slate-100"
                >
                  <Logout className="size-5" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpenPerfilModal && (
        <ProfileUserModal
          onClose={() => {
            setIsOpenProfileModal(false);
          }}
          openFromUserMenu={true}
        />
      )}
    </>
  );
};

export default UserMenu;
