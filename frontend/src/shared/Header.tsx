interface HeaderProps {
  onOpenPopup: () => void;
}

const Header = ({ onOpenPopup }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 flex w-full items-center justify-around bg-[#B1B1B1] p-4 shadow">
      <button type="button">Iniciar Sesión</button>
      <button type="button" onClick={onOpenPopup}>
        Crear cuenta
      </button>
    </header>
  );
};

export default Header;
