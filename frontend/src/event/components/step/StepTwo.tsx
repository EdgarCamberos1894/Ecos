import { useRef, useState } from "react";
import { FormData } from "@/event/type/FormData";
import { UploadCloud } from "@/profiles/components/ui/UploadCloud";

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function StepTwo({ nextStep, prevStep, setFormData }: StepTwoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateImageSize = (file: File) => {
    return new Promise<boolean>((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        URL.revokeObjectURL(objectUrl);
        // Validamos el tamaño de la imagen
        if (width >= 1170 && height >= 504) {
          resolve(true);
        } else {
          reject(new Error("La imagen debe tener al menos 1170 píxeles de ancho y 504 de alto"));
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("No se pudo cargar la imagen"));
      };
      img.src = objectUrl;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateImageSize(selectedFile)
        .then(() => {
          setFile(selectedFile);
          setFormData((prev) => ({ ...prev, image: selectedFile }));
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(reader.result as string);
          };
          reader.readAsDataURL(selectedFile);
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            alert(error.message);
          }
        });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateImageSize(droppedFile)
      .then(() => {
        setFile(droppedFile);
        setFormData((prev) => ({ ...prev, image: droppedFile }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(droppedFile);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          alert(error.message);
        }
      });
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    console.log("Imagen guardada:", file);
  };

  const handleDelete = () => {
    setFile(null);
    setImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFormData((prev) => ({ ...prev, image: null }));
  };

  return (
    <div className="mx-auto mb-40 max-w-7xl flex-1 space-y-8 p-6">
      <section className="border[#19233A] flex h-[604px] w-full max-w-[801px] flex-col items-center justify-center gap-y-9 border">
        <label
          htmlFor="fileInput"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`flex h-[390px] w-[686px] cursor-pointer flex-col items-center justify-center rounded-lg ${file ? "" : "border-2 border-dashed"} border-gray-400 px-4 py-8 text-center`}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Banner" className="w-full rounded-lg object-cover" />
          ) : (
            <>
              <UploadCloud className="mb-4" />
              <p className="text-lg font-semibold">Subí tu imagen aquí</p>
              <p className="mt-2 text-sm text-gray-600">
                La imagen debe tener al menos 1170 píxeles de ancho y 504 de alto <br />
                Formatos válidos: JPG, GIF, PNG.
              </p>
              <span className="my-2 font-bold text-gray-500">o</span>
              <div className="rounded-full bg-gray-500 px-6 py-2 text-sm font-semibold text-white">
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
      </section>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          onClick={nextStep}
          className="rounded-[37px] bg-[#FE963D] px-6 py-2 text-white hover:opacity-90"
        >
          Guardar y continuar
        </button>
        <button
          type="button"
          onClick={prevStep}
          className="rounded-[37px] bg-[#19233A] px-6 py-2 text-white hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
