import { useEffect, useState } from "react";
import { Link, type Location, type NavigateFunction, useLocation, useNavigate } from "react-router";
/*import { Avatar } from "@/auth/components/ui/Avatar";*/
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import EcosLogo from "@/app/ui/EcosIcon";
import MenuIcon from "@/app/ui/MenuIcon";
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
  //"Preguntas Frecuentes",//
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
      <header className="bg-ecos-blue w-full pb-8 shadow lg:h-[17.25rem]">
        <div className="mx-auto flex items-center justify-between py-6 pr-2.5 pl-6">
          <div className="flex flex-auto items-center gap-9">
            <Link to="/" className="hidden lg:block">
              <EcosLogo className="h-auto w-[7.563rem]" />
            </Link>

            <button
              type="button"
              className="block focus:outline-none lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isOpen ? (
                <span className="text-4xl text-white md:ml-9">✖</span>
              ) : (
                <MenuIcon className="h-12 w-12 text-white md:ml-9" />
              )}
            </button>

            {isOpen && (
              <div className="fixed inset-0 z-10" onClick={closeMobileMenu}>
                <nav
                  className="absolute top-22 left-1 z-10 flex w-[17.875rem] flex-col items-start gap-2.5 rounded-[1.25rem] bg-white px-[1.625rem] py-[3.313rem] shadow-md lg:hidden"
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

            <nav className="text-ecos-base hidden gap-10 text-2xl font-normal lg:flex">
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

          <div className="flex items-center justify-end">
            {!user ? (
              <>
                <div className="text-ecos-base hidden gap-6 px-[2.438rem] md:flex">
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
                {/* <Avatar className="my-1 mr-[1.375rem] ml-[1.438rem]" /> */}
              </>
            ) : (
              <>
                {/* <Bell className="size-[70px]" /> */}
                <UserMenu />
              </>
            )}
          </div>
        </div>

        <Input
          placeholder="Busca Artista, Album, Canción"
          startIcon={<MenuIcon />}
          endIcon={<Lens />}
          className="mx-auto bg-white"
        />
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
