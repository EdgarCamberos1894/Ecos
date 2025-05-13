import { ChangeEvent, useRef, useState } from "react";
// import { useApiMutation } from "@/shared/hooks/use-api-mutation";

// type UploadStatus = "idle" | "uploading" | "success" | "error";

export function MusicUploader() {
  const [file, setFile] = useState<File | null>(null);
  // const [status, setStatus] = useState<UploadStatus>("idle");
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

  // function handleSubmit() {
  //   if (!file) return;
  //   setStatus("uploading");

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("trackName", trackName);
  //   formData.append("albumName", albumName);

  //   console.log("ENVIANDO AL BACKEND -->", formData);

  //   try {
  //     await uploadMusic.mutateAsync(formData);
  //     setStatus("success");
  //   } catch {
  //     setStatus("error");
  //   }
  // }

  return (
    <section className="border-ecos-dark-grey-light max-w-md space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
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

      {/* {status === "success" && <p className="text-sm text-green-600">Archivo subido con éxito!</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">Error al subir el archivo. Probá de nuevo.</p>
      )} */}
    </section>
  );
}
