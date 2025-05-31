import { useEffect, useState } from "react";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import MenuIcon from "@/app/ui/MenuIcon";
import Lens from "@/app/ui/LensIcon";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { FanNavbar } from "./components/FanNavbar";
import { LogoLink } from "./components/LogoLink";
import { MobileAuthMenu } from "./components/MobileAuthMenu";
import { MobileFanMenu } from "./components/MobileFanMenu";
import { RegisterButton, LoginButton } from "@/app/components/ButtonsAuth";

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
          <div>
            <LogoLink
              className={`h-[120px] w-auto flex-shrink-0 items-center md:h-[141px] ${
                user?.role === "FAN" ? "hidden lg:flex" : "flex"
              }`}
            />
            {user?.role === "FAN" && (
              <div className="relative block px-7 focus:outline-none lg:hidden">
                <button type="button" onClick={toggleMobileMenu} className="relative z-20">
                  {isOpen ? (
                    <span className="text-4xl text-white">✖</span>
                  ) : (
                    <MenuIcon className="h-12 w-12 text-white" />
                  )}
                </button>
                <MobileFanMenu userId={user.id} isOpen={isOpen} closeMenu={closeMobileMenu} />
              </div>
            )}
          </div>

          {user?.role === "MUSICIAN" && (
            <Input
              placeholder="Busca Artista, Álbum, Canción"
              startIcon={<MenuIcon />}
              endIcon={<Lens />}
              classNameContainer="hidden md:flex w-full bg-white items-center gap-2 h-12 mx-6 max-w-[800px]"
            />
          )}

          {user?.role === "FAN" && <FanNavbar userId={user.id} />}

          <div className="flex flex-shrink-0 items-center justify-between">
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

            {!user && (
              <div className="relative block px-7 focus:outline-none lg:hidden">
                <button type="button" onClick={toggleMobileMenu} className="relative z-20">
                  {isOpen ? (
                    <span className="text-4xl text-white">✖</span>
                  ) : (
                    <MenuIcon className="h-12 w-12 text-white" />
                  )}
                </button>
                <MobileAuthMenu
                  isOpen={isOpen}
                  onLogin={() => {
                    handleOpenModal("login");
                  }}
                  onRegister={() => {
                    handleOpenModal("register");
                  }}
                  closeMenu={closeMobileMenu}
                />
              </div>
            )}

            {user && (
              <div className="lg:hidden">
                <UserMenu />
              </div>
            )}
          </div>
        </div>
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
