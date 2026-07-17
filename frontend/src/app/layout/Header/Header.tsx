import { useEffect, useState } from "react";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
import { FanNavbar } from "./components/FanNavbar";
import { LogoLink } from "./components/LogoLink";
import { MobileAuthMenu } from "./components/MobileAuthMenu";
import { MobileFanMenu } from "./components/MobileFanMenu";
import { RegisterButton, LoginButton } from "@/app/components/ButtonsAuth";
import { MenuIcon } from "@/app/ui/Icons";
import SearchBar from "@/app/components/SearchBar";
import { Link, useLocation } from "react-router";

export const Header = () => {
  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) setOpenModal(null);
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("showWelcomeUser")) {
      setShowWelcomeUser(true);
      setOpenModal(null);
      localStorage.removeItem("showWelcomeUser");
    }
  }, [user]);

  const mobileToggle = (
    <button
      type="button"
      aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
      onClick={() => {
        setIsOpen((open) => !open);
      }}
      className="focus-visible:outline-ecos-orange-light relative z-20 rounded-md p-2 text-white focus-visible:outline-2"
    >
      {isOpen ? <span className="text-2xl">X</span> : <MenuIcon className="h-7 w-7" />}
    </button>
  );

  return (
    <>
      <header className="bg-ecos-blue sticky top-0 z-10 w-full border-b border-white/10 shadow-lg">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-3 px-4 py-2 sm:gap-5 md:px-8">
          <div className="flex min-w-0 items-center">
            <LogoLink
              className={`h-14 w-auto flex-shrink-0 items-center sm:h-16 ${user?.role === "FAN" ? "hidden xl:flex" : "flex"}`}
            />
            {user?.role === "FAN" && (
              <div className="relative block xl:hidden">
                {mobileToggle}
                <MobileFanMenu
                  userId={user.id}
                  isOpen={isOpen}
                  closeMenu={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            )}
          </div>

          {user?.role === "MUSICIAN" && (
            <nav
              aria-label="Navegacion del artista"
              className="hidden min-w-0 items-center gap-5 xl:flex"
            >
              <Link
                to={`/profile/musician/${user.id}`}
                className={`border-b-2 pb-1 text-sm font-bold whitespace-nowrap transition-colors ${location.pathname === `/profile/musician/${user.id}` ? "border-ecos-orange-light text-white" : "hover:text-ecos-orange-light border-transparent text-white/75"}`}
              >
                Mi perfil
              </Link>
              <Link
                to="/profile/musician/edit?section=overview"
                className={`border-b-2 pb-1 text-sm font-bold whitespace-nowrap transition-colors ${location.pathname === "/profile/musician/edit" ? "border-ecos-orange-light text-white" : "hover:text-ecos-orange-light border-transparent text-white/75"}`}
              >
                Panel
              </Link>
            </nav>
          )}
          {user?.role === "MUSICIAN" && (
            <div className="hidden max-w-[620px] min-w-0 flex-1 md:flex">
              <SearchBar isFromHeader={true} />
            </div>
          )}
          {user?.role === "FAN" && <FanNavbar userId={user.id} />}

          <div className="flex flex-shrink-0 items-center">
            <div className={`${user ? "hidden xl:flex" : "hidden min-[480px]:flex"} items-center`}>
              {user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <LoginButton
                    onClick={() => {
                      setOpenModal("login");
                    }}
                    className="cursor-pointer text-sm text-white sm:text-base"
                    label="Ingresar"
                  />
                  <RegisterButton
                    onClick={() => {
                      setOpenModal("register");
                    }}
                    className="text-ecos-blue cursor-pointer px-3 py-2 text-sm sm:px-4 sm:text-base"
                    label="Registro"
                  />
                </div>
              )}
            </div>
            {!user && (
              <div className="relative block min-[480px]:hidden">
                {mobileToggle}
                <MobileAuthMenu
                  isOpen={isOpen}
                  onLogin={() => {
                    setOpenModal("login");
                  }}
                  onRegister={() => {
                    setOpenModal("register");
                  }}
                  closeMenu={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            )}
            {user && (
              <div className="xl:hidden">
                <UserMenu />
              </div>
            )}
          </div>
        </div>
      </header>
      {openModal && (
        <AuthModal
          mode={openModal}
          onClose={() => {
            setOpenModal(null);
          }}
        />
      )}
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
