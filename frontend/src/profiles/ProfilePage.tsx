import { useAuth } from "@/auth/hooks/use-auth";
import BannerUploader from "./components/BannerUploader";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <BannerUploader />
      <div className="mb-24 ml-40 space-y-2">
        <h2 className="text-4xl font-bold">¡Bienvenido!</h2>
        <h1 className="text-8xl font-bold">{user?.name}</h1>
        <h3 className="mt-6 text-2xl font-medium">Editar Perfil</h3>
      </div>
    </div>
  );
}
