import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div>
      <h2>Bienvenid@ a tu Perfil</h2>
      <Link to="/" className="text-center text-blue-500 hover:underline">
        Volver a la página de inicio
      </Link>
    </div>
  );
}
