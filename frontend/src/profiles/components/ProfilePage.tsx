import { useAuth } from "@/auth/hooks/use-auth";
import { Link } from "react-router";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Hola {user?.name}, este es tu perfil</h2>
      <Link to="/" className="text-center text-blue-500 hover:underline">
        Volver a la página de inicio
      </Link>
    </div>
  );
}
