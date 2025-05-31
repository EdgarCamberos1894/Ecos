import { RegisterButton, LoginButton } from "@/app/components/ButtonsAuth";

export const MobileAuthMenu = ({
  isOpen,
  onLogin,
  onRegister,
  closeMenu,
}: {
  isOpen: boolean;
  onLogin: () => void;
  onRegister: () => void;
  closeMenu: () => void;
}) =>
  isOpen && (
    <nav
      className="absolute top-full right-2 z-10 flex w-max max-w-xs flex-col items-start gap-4 rounded-[1.25rem] bg-white px-[1.625rem] py-[4rem] shadow-md lg:hidden"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <LoginButton
        onClick={() => {
          onLogin();
          closeMenu();
        }}
        className="text-ecos-blue cursor-pointer text-xl"
      />
      <RegisterButton
        onClick={() => {
          onRegister();
          closeMenu();
        }}
        className="text-ecos-blue cursor-pointer text-xl"
      />
    </nav>
  );
