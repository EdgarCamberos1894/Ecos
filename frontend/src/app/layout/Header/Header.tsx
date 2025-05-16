import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Avatar } from "@/auth/components/ui/Avatar";
import Input from "@/app/ui/Input";
import AuthModal, { AuthMode } from "@/auth/components/AuthModal";
import Layer from "@/assets/Layer.svg?react";
import MenuIcon from "@/assets/hamburgerMenu-2.svg?react";
import Lens from "@/assets/lens.svg?react";
import { useAuth } from "@/auth/hooks/use-auth";
import UserMenu from "@/auth/components/UserMenu";
import { Bell } from "./Bell";
import WelcomeUserModal from "@/auth/components/WelcomeUserModal";

export const Header = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["explorar", "artistas", "eventos", "preguntas"];
      const scrollY = window.scrollY;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
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

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="w-full bg-[#19233A] shadow">
        <div className="mx-auto flex items-center justify-between px-12 py-6">
          <div className="flex items-center gap-16">
            <Link to="/" className="hidden px-6 py-5 lg:flex">
              <Layer />
            </Link>
            <button
              type="button"
              className="block p-4 focus:outline-none lg:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <span className="h-12 w-12 text-4xl text-[#19233A]">✖</span>
              ) : (
                <MenuIcon className="h-12 w-12" />
              )}
            </button>
            {isOpen && (
              <nav className="absolute top-22 left-1 z-20 w-56 rounded-2xl bg-white px-8 py-10 shadow-md lg:hidden">
                <Link to="/" className="block py-2 text-[#19233A]" onClick={closeMenu}>
                  Inicio
                </Link>
                {!user && (
                  <button
                    type="button"
                    title="Iniciar sesion"
                    className="block py-2 text-[#19233A]"
                    onClick={() => {
                      handleOpenModal("login");
                      closeMenu();
                    }}
                  >
                    Iniciar Sesión
                  </button>
                )}
                <a
                  className="block cursor-pointer py-2 text-[#19233A]"
                  onClick={() => {
                    scrollToSection("#explorar");
                    closeMenu();
                  }}
                >
                  Explorar
                </a>
                <a
                  className="block cursor-pointer py-2 text-[#19233A]"
                  onClick={() => {
                    scrollToSection("#artistas");
                    closeMenu();
                  }}
                >
                  Artistas Destacados
                </a>
                <a
                  className="block cursor-pointer py-2 text-[#19233A]"
                  onClick={() => {
                    scrollToSection("#eventos");
                    closeMenu();
                  }}
                >
                  Eventos
                </a>
                <a
                  className="block cursor-pointer py-2 text-[#19233A]"
                  onClick={() => {
                    scrollToSection("#preguntas");
                    closeMenu();
                  }}
                >
                  Preguntas Frecuentes
                </a>
              </nav>
            )}
            <nav className="hidden gap-6 text-xl font-semibold text-white lg:flex xl:gap-16">
              <a
                className={`cursor-pointer hover:text-[#B1B1B1] ${activeSection === "explorar" ? "text-[#FE963D]" : ""}`}
                onClick={() => {
                  scrollToSection("#explorar");
                }}
              >
                Explorar
              </a>
              <a
                className={`cursor-pointer hover:text-[#B1B1B1] ${activeSection === "artistas" ? "text-[#FE963D]" : ""}`}
                onClick={() => {
                  scrollToSection("#artistas");
                }}
              >
                Artistas destacados
              </a>
              <a
                className={`cursor-pointer hover:text-[#B1B1B1] ${activeSection === "eventos" ? "text-[#FE963D]" : ""}`}
                onClick={() => {
                  scrollToSection("#eventos");
                }}
              >
                Eventos
              </a>
              <a
                className={`cursor-pointer hover:text-[#B1B1B1] ${activeSection === "preguntas" ? "text-[#FE963D]" : ""}`}
                onClick={() => {
                  scrollToSection("#preguntas");
                }}
              >
                Preguntas Frecuentes
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            {!user ? (
              <>
                <div className="hidden gap-6 text-xl font-semibold text-white lg:flex xl:mx-24 xl:gap-12">
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
          </div>
        </div>
        <div className="mx-auto mb-6 w-88 md:w-192 lg:-mt-12 lg:mb-12 lg:w-4/5">
          <Input
            placeholder="Busca Artista, Album, Canción"
            className="mx-auto flex w-full bg-[#ECE6F0] text-[#19233A] sm:w-4/5 lg:py-2 lg:text-xl lg:font-semibold"
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
