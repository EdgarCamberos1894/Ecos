import { useEffect, useState } from "react";
import { Link } from "react-router";
import { RegisterButton, LoginButton } from "@/app/components/ButtonsAuth";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import Logo from "@/app/components/Logo";
import MenuIcon from "@/app/ui/MenuIcon";
import Lens from "@/app/ui/LensIcon";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

export const Header = () => {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const handleOpenModal = (mode: AuthMode) => {
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) setOpenModal(null);
  }, [user]);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showWelcomeUser");
    if (shouldShow) {
      setShowWelcomeUser(true);
      setOpenModal(null);
      localStorage.removeItem("showWelcomeUser");
    }
  }, [user]);

  return (
    <>
      <header className="bg-ecos-blue w-full shadow">
        <div className="mx-auto flex items-center justify-between gap-x-8 px-4 py-2 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex h-[120px] w-auto flex-shrink-0 items-center md:h-[141px]">
            <Logo
              textClassName="text-white text-4xl md:text-6xl lg:text-[6rem]"
              svgClassName="text-white w-20 h-20 md:w-24 md:h-24 lg:w-[141px] lg:h-[141px] "
            />
          </Link>

          {/* Buscador solo visible si está logueado */}
          {user && (
            <Input
              placeholder="Busca Artista, Álbum, Canción"
              startIcon={<MenuIcon />}
              endIcon={<Lens />}
              classNameContainer="hidden md:flex 
         w-full bg-white items-center gap-2 h-12 mx-6 w-full max-w-[400px] md:max-w-[800px] "
            />
          )}

          {/* Avatar o botones de login/register */}
          <div className="flex flex-shrink-0 items-center justify-between">
            {/* Desktop: userMenu o botones */}
            <div className="hidden items-center lg:flex">
              {user ? (
                <UserMenu />
              ) : (
                <div className="space-x-6 px-6">
                  <LoginButton
                    onClick={() => {
                      handleOpenModal("login");
                    }}
                    className="cursor-pointer text-xl text-white"
                  />
                  <RegisterButton
                    onClick={() => {
                      handleOpenModal("register");
                    }}
                    className="cursor-pointer text-xl text-white"
                  />
                </div>
              )}
            </div>

            {/* Mobile: hamburguesa solo si NO está logueado */}
            {!user && (
              <button
                type="button"
                className="block px-7 focus:outline-none lg:hidden"
                onClick={toggleMobileMenu}
              >
                {isOpen ? (
                  <span className="text-4xl text-white">✖</span>
                ) : (
                  <MenuIcon className="h-12 w-12 text-white" />
                )}
              </button>
            )}

            {/* Mobile: userMenu si está logueado */}
            {user && (
              <div className="lg:hidden">
                <UserMenu />
              </div>
            )}
          </div>
        </div>

        {/* Mobile: menú visible solo si no hay usuario */}
        {!user && isOpen && (
          <nav
            className="absolute top-[5.5rem] right-2 z-10 flex w-fit max-w-xs flex-col items-start gap-4 rounded-[1.25rem] bg-white px-[1.625rem] py-[4rem] shadow-md lg:hidden"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <LoginButton
              onClick={() => {
                handleOpenModal("login");
                closeMobileMenu();
              }}
              className="text-ecos-blue cursor-pointer text-xl"
            />
            <RegisterButton
              onClick={() => {
                handleOpenModal("register");
                closeMobileMenu();
              }}
              className="text-ecos-blue cursor-pointer text-xl"
            />
          </nav>
        )}
      </header>

      {openModal && <AuthModal mode={openModal} onClose={handleCloseModal} />}
      {showWelcomeUser && (
        <WelcomeUserModal
          onClose={() => {
            setShowWelcomeUser(false);
          }}
        />
      )}
    </>
  );
};
