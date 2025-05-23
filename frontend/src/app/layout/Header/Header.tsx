import { useEffect, useState } from "react";
import { Link, type Location, type NavigateFunction, useLocation, useNavigate } from "react-router";
import { Avatar } from "@/auth/components/ui/Avatar";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import EcosLogo from "@/app/ui/EcosIcon";
import MenuIcon from "@/app/ui/HamburguerMenuIcon";
import Lens from "@/app/ui/LensIcon";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";
// import { Bell } from "./Bell";

const NAV_SECTIONS = [
  "Inicio",
  "Explorar",
  "Artistas Destacados",
  "Eventos",
  "Preguntas Frecuentes",
];

const FAN_SECTIONS = ["Inicio", "Mis Favoritos", "Artistas Destacados", "Eventos"];

const handleNavClick = (section: string, navigate: NavigateFunction, location: Location) => {
  const hash = `#${section.toLowerCase().replace(" ", "-")}`;

  if (location.pathname !== "/") {
    navigate(hash.includes("inicio") ? "/" : `/${hash}`);
  } else {
    const $section = document.getElementById(hash.slice(1));
    if ($section) $section.scrollIntoView({ behavior: "smooth" });
  }
};

export const Header = () => {
  // const [activeSection, setActiveSection] = useState("");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ["explorar", "artistas", "eventos", "preguntas"];
  //     const scrollY = window.scrollY;

  //     sections.forEach((id) => {
  //       const section = document.getElementById(id);
  //       if (section) {
  //         const offsetTop = section.offsetTop;
  //         const height = section.offsetHeight;

  //         if (scrollY >= offsetTop && scrollY < offsetTop + height) {
  //           setActiveSection(id);
  //         }
  //       }
  //     });
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const [openModal, setOpenModal] = useState<AuthMode | null>(null);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const isFan = user?.role === "FAN";

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
      <header className="bg-ecos-blue shadow">
        <div className="mx-auto flex items-center justify-between py-6 pr-2.5 pl-6 xl:pr-[22px] xl:pl-[45px]">
          <div className="flex flex-auto items-center gap-9 2xl:gap-[74px]">
            <Link to="/" className="hidden lg:flex">
              <EcosLogo className="h-auto w-20 py-5 xl:w-[121px] xl:py-0" />
            </Link>

            <button
              type="button"
              className="block focus:outline-none lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isOpen ? (
                <span className="text-5xl text-white">✖</span>
              ) : (
                <MenuIcon className="h-12 w-12 md:ml-9" />
              )}
            </button>

            {isOpen && (
              <div className="fixed inset-0 z-10" onClick={closeMobileMenu}>
                <nav
                  className="absolute top-22 left-1 z-10 flex w-[286px] flex-col items-start gap-2.5 rounded-[20px] bg-white px-[26px] py-[53px] shadow-md lg:hidden"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {isFan
                    ? FAN_SECTIONS.map((section) => (
                        <a
                          key={section}
                          title={section}
                          onClick={() => {
                            handleNavClick(section, navigate, location);
                            closeMobileMenu();
                          }}
                          className="text-ecos-blue text-2xl font-normal"
                        >
                          {section}
                        </a>
                      ))
                    : NAV_SECTIONS.map((section) => (
                        <a
                          key={section}
                          title={section}
                          onClick={() => {
                            handleNavClick(section, navigate, location);
                            closeMobileMenu();
                          }}
                          className="text-ecos-blue text-2xl font-normal"
                        >
                          {section}
                        </a>
                      ))}
                </nav>
              </div>
            )}

            <nav className="text-ecos-base hidden gap-10 text-xl font-normal lg:flex 2xl:gap-20 2xl:text-2xl">
              {isFan
                ? FAN_SECTIONS.map((section) => (
                    <a key={section} className={`cursor-pointer hover:text-[#B1B1B1]`}>
                      {section}
                    </a>
                  ))
                : NAV_SECTIONS.slice(1).map((section) => (
                    <a
                      key={section}
                      onClick={() => {
                        handleNavClick(section, navigate, location);
                        closeMobileMenu();
                      }}
                      title={section}
                      className={`cursor-pointer hover:text-[#B1B1B1]`}
                    >
                      {section}
                    </a>
                  ))}
            </nav>
          </div>

          <div className="flex items-center justify-end xl:gap-3 2xl:gap-[74px]">
            {!user ? (
              <>
                <div className="text-ecos-base hidden gap-6 px-[39px] text-base font-normal md:flex">
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
                <Avatar className="m-5 md:m-0" />
              </>
            ) : (
              <>
                {/* <Bell className="size-[70px]" /> */}
                <UserMenu />
              </>
            )}
          </div>
        </div>
        <div className="mx-auto mb-6 w-88 md:w-192 lg:-mt-12 lg:mb-12 lg:w-4/5">
          <Input
            placeholder="Busca Artista, Album, Canción"
            className="text-ecos-blue mx-auto flex w-full bg-[#ECE6F0] sm:w-4/5 lg:py-2 lg:text-xl lg:font-semibold"
            startIcon={<MenuIcon className="my-auto" />}
            endIcon={<Lens className="my-auto" />}
          />
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
