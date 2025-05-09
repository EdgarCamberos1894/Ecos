import { useRef, useState } from "react";
import { UploadCloud } from "./ui/UploadCloud";

export default function BannerUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isValid = img.width >= 1170 && img.height >= 504;
        resolve(isValid);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Formato inválido. Solo se aceptan JPG, PNG o GIF.");
      return;
    }

    const isValidSize = await validateImageDimensions(file);
    if (!isValidSize) {
      alert("La imagen debe tener al menos 1170px de ancho y 504px de alto.");
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFile(file);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [selectedFile] = event.target.files ?? [];

    if (selectedFile.size > 0) {
      await handleFile(selectedFile);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const [droppedFile] = event.dataTransfer.files;

    if (droppedFile.size > 0) {
      handleFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDelete = () => {
    setImageUrl(null);
    setFile(null);
  };

  const handleSubmit = () => {
    if (file) {
      console.log("Enviando archivo al backend:", file);
    }
  };

  return (
    <section className="flex w-full flex-col items-center gap-4 py-10">
      <label
        htmlFor="fileInput"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg ${file ? "" : "border-2 border-dashed"} border-gray-400 px-4 py-8 text-center`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Banner"
            className="max-h-[300px] w-full rounded-lg object-cover"
          />
        ) : (
          <>
            <UploadCloud className="mb-4" />
            <p className="text-lg font-semibold">Subí tu imagen aquí</p>
            <p className="mt-2 text-sm text-balance text-gray-600">
              La imagen debe tener al menos 1170 píxeles de ancho y 504 de alto
              <br />
              Formatos válidos: JPG, GIF, PNG.
            </p>
            <span className="my-2 font-bold text-gray-500">o</span>
            <div className="bg-ecos-blue rounded-full px-20 py-2.5 text-sm font-medium text-white">
              BUSCAR ARCHIVO
            </div>
          </>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleChange}
          ref={inputRef}
          className="hidden"
        />
      </label>

      {file && (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file}
            className="bg-ecos-orange-light hover:bg-ecos-orange cursor-pointer rounded-full px-16 py-2.5 font-medium text-white transition-colors"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!file}
            className="bg-ecos-blue cursor-pointer rounded-full px-16 py-2.5 font-medium text-white transition-colors hover:bg-gray-400"
          >
            Eliminar
          </button>
        </div>
      )}
    </section>
  );
}
