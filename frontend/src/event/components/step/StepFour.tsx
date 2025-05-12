import type { FormData } from "@/event/type/FormData";

interface StepFourProps {
  prevStep: () => void;
  formData: FormData;
}

export default function StepFour({ prevStep, formData }: StepFourProps) {
  return (
    <form>
      <h2 className="mb-4 text-xl font-bold">Resumen del Evento</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Título:</strong> {formData.eventName}
        </li>
        <li>
          <strong>Descripción:</strong> {formData.description}
        </li>
        <li>
          <strong>Fecha:</strong> {formData.date}
        </li>
        <li>
          <strong>Hora:</strong> {formData.hour}
        </li>
        <li>
          <strong>Ubicación:</strong> {formData.location}
        </li>
        <li>
          <strong>Precio Puerta:</strong> {formData.price}
        </li>
      </ul>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          className="rounded-[37px] bg-[#FE963D] px-6 py-2 text-white hover:opacity-90"
        >
          Publicar Evento
        </button>
        <button
          type="button"
          onClick={prevStep}
          className="rounded-[37px] bg-[#19233A] px-6 py-2 text-white hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
