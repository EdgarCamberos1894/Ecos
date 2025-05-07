import Modal from "@/app/ui/Modal";
import { useState } from "react";
import ProfileImagenModal from "./components/ProfileImagen";
import ImageUploadModal from "./components/ImageUpdload";
import Button from "@/app/ui/Button";
import { Edit } from "../../ui/Edit";
import { Trash } from "../../ui/Trash";

export type Transition = "edit" | "upload";

interface ProfilePhotoPropsModal {
  mode: Transition;
  onClose: () => void;
  //onPreviewChange: (preview: string) => void;
  //onSave: () => void;
}

const ProfilePhotoModal = ({ mode, onClose }: ProfilePhotoPropsModal) => {
  const [transition, setTransition] = useState<Transition>(mode);
  //const [file, setFile] = useState<File | null>(null);
  //const [preview, setPreview] = useState<string | null>(null);

  const switchToUpload = () => {
    setTransition("upload");
  };

  /*const handleSave = () => {
    if (file && preview) {
      console.log("Guardando archivo:", file);
      onPreviewChange(preview);
      onSave();
    }
  };*/

  return (
    <Modal onClose={onClose}>
      <h2 className="p-2 text-start text-2xl font-medium">IMAGEN DE PERFIL </h2>
      {transition === "edit" && (
        <div>
          <ProfileImagenModal />
          <div className="flex items-center gap-11">
            <Button
              type="submit"
              startIcon={<Edit className="h-10 w-10 stroke-white" />}
              children="CAMBIAR"
              className="bg-[#6E6E6E] text-white"
              onClick={switchToUpload}
            />
            <Button
              children="ELIMINAR"
              className="text-white"
              startIcon={<Trash className="h-10 w-10" />}
            />
          </div>
        </div>
      )}
      {transition === "upload" && (
        <div>
          <ImageUploadModal />
          <div className="flex justify-between gap-2 font-medium">
            <Button
              children="GUARDAR"
              /*disabled={!file}
              onClick={handleSave}*/
              className="bg-[#6E6E6E] text-white"
            />
            <Button children="CANCELAR" onClick={onClose} className="text-white" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProfilePhotoModal;
