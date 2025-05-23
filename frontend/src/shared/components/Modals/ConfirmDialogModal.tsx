import Button from "@/app/ui/Button";
import Modal from "@/app/ui/Modal";

interface ConfirmDialogModalProps {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmDialogModal = ({ onClose, onConfirm, message }: ConfirmDialogModalProps) => {
  return (
    <Modal onClose={onClose} firstNormalText="Confirmación">
      <div className="p-4">
        <div className="mb-4">
          <p className="text-lg">{message}</p>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onConfirm} type="button" bgType="primary" aria-label="Confirmar acción">
            Confirmar
          </Button>
          <Button onClick={onClose} type="button" bgType="secondary" aria-label="Cancelar acción">
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialogModal;
