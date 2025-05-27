import { ChangeEvent, useRef, useState } from "react";
import { type SettingMusic } from "../EditProfileMusicianPage";

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
      alert("Solo se permiten archivos .mp3 o .wav");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);

    onSettingMusic?.({ audio: selectedFile });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const handleDeleteFile = () => {
    if (!file) return;

    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="border-ecos-blue space-y-4 rounded-[20px] border px-4 py-3">
      <div className="space-y-2">
        <label className="text-ecos-blue block text-2xl font-semibold">Cargar audio</label>

        <div className="border-ecos-dark-grey-light relative flex items-center gap-2.5 rounded-[20px] border px-6 py-3.5">
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
            className="bg-ecos-blue inline-block shrink-0 cursor-pointer rounded-md border px-2.5 py-1 text-sm text-white md:text-xl"
          >
            Buscar Archivo
          </label>

          <span className="text-ecos-dark-grey-light text-sm md:text-[22px]">
            {file ? file.name : "No se ha elegido ningún archivo"}
          </span>
        </div>

        <p className="text-ecos-dark-grey text-xs md:text-base">
          El audio puede ser formato mp3 o wav
        </p>
      </div>

      <div className="mb-2 flex gap-5">
        <button
          type="button"
          className="bg-ecos-blue min-w-[112px] cursor-pointer rounded-[100px] px-6 py-2.5 text-white"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleDeleteFile}
          className="border-ecos-blue text-ecos-blue min-w-[112px] cursor-pointer rounded-[100px] border bg-white px-6 py-2.5"
        >
          Cancelar
        </button>
      </div>
    </section>
  );
}
