import { ComponentProps, useRef, useState } from "react";
import { UploadCloud } from "./ui/Icons";
import { Spinner } from "@/app/ui/Spinner";

interface BannerUploaderProps extends ComponentProps<"section"> {
  onImageUpload?: (file: File | null, imageUrl: string | null) => void;
  onUpload?: () => void;
  onDelete?: () => void;
  isUploading?: boolean;
}

export default function BannerUploader({
  onImageUpload,
  onUpload,
  onDelete,
  isUploading,
  ...sectionProps
}: BannerUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Formato inválido. Solo se aceptan JPG o PNG.");
      return;
    }

    const isValidSize = await validateImageDimensions(file);
    if (!isValidSize) {
      setError("La imagen debe tener al menos 1170px de ancho y 504px de alto.");
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFile(file);
    onImageUpload?.(file, url);
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

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onDelete?.();
  };

  return (
    <section {...sectionProps}>
      <label
        htmlFor="fileInput"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`mt-7 mb-[11px] flex w-full flex-auto flex-col items-center justify-center ${file ? "" : "border-2 border-dashed"} border-gray-400 px-4 py-8 text-center`}
      >
        {imageUrl ? (
          isUploading ? (
            <>
              <img
                src={imageUrl}
                alt="Banner"
                className="relative h-[263px] w-full rounded-lg object-cover opacity-30"
              />
              <Spinner className="absolute size-12" />
            </>
          ) : (
            <img src={imageUrl} alt="Banner" className="h-[263px] w-full rounded-lg object-cover" />
          )
        ) : (
          <>
            <UploadCloud className="text-ecos-blue mb-2" />
            <p className="text-ecos-blue text-lg font-semibold">Sube tu imagen aquí</p>
            <p className="text-ecos-dark-grey mt-2 hidden text-sm text-balance md:block">
              La imagen debe tener al menos 1170 píxeles de ancho y 504 de alto
              <br />
              Formatos válidos: JPG o PNG.
            </p>
            <p className="text-ecos-dark-grey mt-2 block text-balance md:hidden">
              formato JPG o PNG
            </p>
            <span className="text-ecos-blue my-2 text-2xl font-medium">o</span>
            <div className="border-ecos-blue text-ecos-blue min-h-10 min-w-[204px] cursor-pointer rounded-full border bg-white px-6 py-2.5 text-sm font-medium">
              Buscar archivo
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
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      {onUpload && (
        <div className="flex flex-1/4 items-start gap-10 md:gap-[46px]">
          <button
            type="button"
            onClick={onUpload}
            disabled={isUploading}
            className="bg-ecos-blue min-h-[40px] min-w-[140px] cursor-pointer rounded-[100px] px-6 py-2.5 font-medium text-white md:min-h-[63px] md:min-w-[221px]"
          >
            {isUploading ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isUploading}
            className="text-ecos-blue border-ecos-blue min-h-[40px] min-w-[140px] cursor-pointer rounded-[100px] border bg-white px-6 py-2.5 font-medium md:min-h-[63px] md:min-w-[221px]"
          >
            Cancelar
          </button>
        </div>
      )}
    </section>
  );
}
