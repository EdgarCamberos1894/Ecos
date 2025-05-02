import { useState } from "react";
import { useAuth } from "@/auth/hooks/use-auth";
import { useNavigate } from "react-router";
import { Avatar } from "@/auth/components/ui/Avatar";
import { EditContainer } from "./ui/EditContainer";
import { Logout } from "./ui/Logout";
import { Settings } from "./ui/Settings";
import { CloseArrow } from "./ui/CloseArrow";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    handleLogout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Avatar />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-4 flex h-[450px] w-80 flex-col items-center justify-around bg-white text-2xl shadow-lg">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
            className="absolute top-0 flex h-12 w-80 items-center justify-end bg-[#D9D9D9] px-5"
          >
            <CloseArrow />
          </button>
          <h2 className="leading-5 font-medium tracking-tight uppercase">{user.name}</h2>
          <div className="flex flex-col items-start gap-6">
            <button
              type="button"
              onClick={() => {
                void navigate("/profile");
                setIsOpen(false);
              }}
              className="flex items-center gap-5 leading-1"
            >
              <EditContainer />
              Editar Perfil
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate("/setting");
                setIsOpen(false);
              }}
              className="flex items-center gap-5 leading-1"
            >
              <Settings />
              Configuración
            </button>
            <button
              onClick={handleLogOut}
              type="button"
              className="flex items-center gap-5 leading-1"
            >
              <Logout />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
