import { ChangeEvent, useRef, useState } from "react";
// import { useApiMutation } from "@/shared/hooks/use-api-mutation";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function MusicUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [trackName, setTrackName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [status, setStatus] = useState<UploadStatus>("idle");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const uploadMusic = useApiMutation<FormData>("songs", "POST", {
  //   "Content-Type": "multipart/form-data",
  // });

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

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleSubmit() {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("trackName", trackName);
    formData.append("albumName", albumName);

    console.log("ENVIANDO AL BACKEND -->", formData);

    // try {
    //   await uploadMusic.mutateAsync(formData);
    //   setStatus("success");
    // } catch {
    //   setStatus("error");
    // }
  }

  return (
    <section className="max-w-md space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <label className="block font-semibold">Cargar audio</label>

        <div className="relative">
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
            className="inline-block cursor-pointer rounded border border-gray-400 bg-gray-200 px-3 py-1 text-sm"
          >
            Buscar Archivo
          </label>

          <span className="ml-2 text-sm text-gray-500">
            {file ? file.name : "No se ha elegido ningún archivo"}
          </span>
        </div>

        <p className="text-xs text-gray-500">El audio puede ser formato mp3 o wav .....</p>
      </div>

      <label className="block font-semibold">
        Nombre del tema
        <input
          type="text"
          placeholder="Escribí el nombre del tema"
          value={trackName}
          onChange={(e) => {
            setTrackName(e.target.value);
          }}
          className="mt-1 w-full rounded border p-2"
        />
      </label>

      <label className="block font-semibold">
        Nombre del álbum
        <input
          type="text"
          placeholder="Escribí el nombre del álbum"
          value={albumName}
          onChange={(e) => {
            setAlbumName(e.target.value);
          }}
          className="mt-1 w-full rounded border p-2"
        />
      </label>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-full bg-gray-600 px-4 py-2 text-white disabled:opacity-50"
          disabled={status === "uploading" || !file}
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={() => {
            setFile(null);
            setTrackName("");
            setAlbumName("");
            setStatus("idle");
          }}
          className="rounded-full bg-gray-300 px-4 py-2 text-black"
        >
          Cancelar
        </button>
      </div>

      {status === "success" && <p className="text-sm text-green-600">Archivo subido con éxito!</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">Error al subir el archivo. Probá de nuevo.</p>
      )}
    </section>
  );
}
