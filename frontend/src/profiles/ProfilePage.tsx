import { useAuth } from "@/auth/hooks/use-auth";
import BannerUploader from "./components/BannerUploader";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);

  const handleImageUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
  };

  const handleDelete = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (file) {
      console.log("Enviando archivo al backend:", file);
    }
  };

  return (
    <>
      <div>
        <BannerUploader onImageUpload={handleImageUpload} />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file}
            className="rounded-full bg-purple-700 px-6 py-2 font-semibold text-white hover:bg-purple-800"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!file}
            className="rounded-full bg-gray-300 px-6 py-2 font-semibold text-gray-800 hover:bg-gray-400"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="mb-24 ml-40 space-y-2">
        <h2 className="text-4xl font-bold">¡Bienvenido!</h2>
        <h1 className="text-8xl font-bold">{user?.name}</h1>
        <h3 className="mt-6 text-2xl font-medium">Editar Perfil</h3>
      </div>
    </>
  );
}
