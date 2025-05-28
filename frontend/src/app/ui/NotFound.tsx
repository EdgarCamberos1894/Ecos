import { Link } from "react-router";
import Logo from "../components/Logo";
import Button from "./Button";

const NotFound = () => {
  return (
    <main className="text-ecos-blue flex h-screen w-screen flex-col items-center justify-center text-center">
      <header className="mb-10">
        <Logo textClassName="text-6xl md:text-8xl" />
      </header>

      <section>
        <h1 className="mb-4 text-6xl font-extrabold md:text-8xl">404</h1>
        <p className="mb-2 text-xl font-semibold md:text-2xl">Página no encontrada</p>
        <p className="text-ecos-blue/80 md:text-xl">
          Lo sentimos, la página que buscas no existe o fue movida.
          <br />
          Por favor, verifica la URL o vuelve al inicio.
        </p>
      </section>

      <nav className="mt-10">
        <Link to="/">
          <Button bgType="primary" className="px-12 py-2 text-lg">
            Ir al inicio
          </Button>
        </Link>
      </nav>
    </main>
  );
};

export default NotFound;
