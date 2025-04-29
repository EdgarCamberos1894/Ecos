interface HeaderProps {
  onOpenPopup: () => void;
}

export const Header = ({ onOpenPopup }: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-around bg-[#B1B1B1] p-4 shadow">
      <button type="button">Iniciar Sesión</button>
      <button type="button" onClick={onOpenPopup}>
        Crear cuenta
      </button>
    </header>
  );
};
