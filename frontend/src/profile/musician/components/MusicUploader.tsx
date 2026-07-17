import { ChangeEvent, useRef, useState } from "react";
import { type SettingMusic } from "../EditProfileMusicianPage";
import { toast } from "sonner";

interface MusicUploaderProps {
  onSettingMusic?: (settings: SettingMusic) => void;
}

export function MusicUploader({ onSettingMusic }: MusicUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const [selectedFile] = event.target.files ?? [];

    if (selectedFile.size === 0) return;

    const validTypes = ["audio/mpeg", "audio/wav"];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error(`Solo se permiten archivos .mp3 o .wav`);
      event.target.value = "";
      return;
    }

    setFile(selectedFile);

    onSettingMusic?.({ audio: selectedFile });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const handleConfirmFile = () => {
    if (!file) return;

    onSettingMusic?.({ audio: file, preview: true });
  };

  const handleDeleteFile = () => {
    if (!file) return;

    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="space-y-2">
        <label className="text-ecos-blue block text-lg font-bold">Cargar audio</label>

        <div className="relative mt-2 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-3">
          <input
            id="audio-upload"
            type="file"
            accept="audio/mp3,audio/wav"
            onChange={handleFileChange}
            className="hidden"
            ref={inputRef}
          />

          <label
            htmlFor="audio-upload"
            className="button-primary inline-block shrink-0 cursor-pointer px-3 py-1.5 text-sm"
          >
            Buscar Archivo
          </label>

          <span className="min-w-0 truncate text-sm text-slate-500">
            {file ? file.name : "No se ha elegido ningún archivo"}
          </span>
        </div>

        <p className="text-ecos-dark-grey text-xs md:text-base">
          El audio puede ser formato mp3 o wav
        </p>
      </div>

      <div className={`flex flex-wrap gap-3 ${file !== null ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={handleConfirmFile}
          className="button-primary cursor-pointer px-5 py-2 text-sm"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleDeleteFile}
          className="button-secondary cursor-pointer px-5 py-2 text-sm"
        >
          Cancelar
        </button>
      </div>
    </section>
  );
}
