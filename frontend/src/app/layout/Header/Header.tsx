import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Avatar } from "@/auth/components/ui/Avatar";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import MenuIcon from "@/assets/hamburgerMenu.svg?react";
import Lens from "@/assets/lens.svg?react";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import { Bell } from "./Bell";

export const Header = () => {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);

  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  useEffect(() => {
    if (user) setOpenModal(null);
  }, [user]);

  return (
    <>
      <header className="flex w-full items-center justify-around bg-[#B1B1B1] p-4 shadow">
        <Link to="/" className="px-6 py-5">
          <img src="LOGO" alt="logo" />
        </Link>
        <nav className="flex items-center gap-20">
          <Link to="/explorer">Explorar</Link>
          <Link to="/artist">Artistas</Link>
          <Link to="/play">Play</Link>
        </nav>
        <Input
          placeholder="Busca Artista, Album, Canción"
          className="flex w-[720px] items-center justify-around gap-1 bg-[#ECE6F0] p-1"
          startIcon={<MenuIcon />}
          endIcon={<Lens />}
        />
        {!user ? (
          <>
            <div className="inline-flex shrink items-center justify-center gap-6">
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleOpenModal("login");
                }}
              >
                Iniciar Sesión
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleOpenModal("register");
                }}
              >
                Crear cuenta
              </button>
            </div>
            <Avatar />
          </>
        ) : (
          <>
            <Bell />
            <UserMenu />
          </>
        )}
      </header>

      {openModal && <AuthModal mode={openModal} onClose={handleCloseModal} />}
    </>
  );
};
