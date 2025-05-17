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

  return (
    <section className="border-ecos-dark-grey-light max-w-md space-y-4 rounded-lg">
      <div className="space-y-2 rounded-[20px]">
        <label className="text-ecos-blue block text-2xl font-semibold">Cargar audio</label>

        <div className="border-ecos-dark-grey-light relative border px-6 py-3.5">
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
            className="bg-ecos-blue inline-block cursor-pointer rounded border px-3 py-1 text-sm text-white"
          >
            Buscar Archivo
          </label>

          <span className="text-ecos-dark-grey-light ml-2 text-sm">
            {file ? file.name : "No se ha elegido ningún archivo"}
          </span>
        </div>

        <p className="text-ecos-dark-grey text-xs">El audio puede ser formato mp3 o wav</p>
      </div>

      <div className="mb-2 flex gap-10">
        <button
          type="button"
          className="bg-ecos-orange-light text-ecos-blue rounded-full px-6 py-2.5"
        >
          Guardar
        </button>
        <button type="button" className="bg-ecos-blue rounded-full px-6 py-2.5 text-white">
          Cancelar
        </button>
      </div>
    </section>
  );
}
