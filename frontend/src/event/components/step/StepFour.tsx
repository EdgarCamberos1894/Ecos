import type { FormData } from "@/event/type/FormData";

interface StepFourProps {
  prevStep: () => void;
  formData: FormData;
}

export default function StepFour({ prevStep, formData }: StepFourProps) {
  return (
    <form>
      <p className="mb-4 text-sm font-normal">
        Casi terminamos! Revisa que los datos sean correctos
      </p>
      <div className="mx-auto flex flex-col gap-y-10 rounded-[50px] border-3 border-[#19233A] p-3 md:w-[807px] md:p-10 lg:w-7xl">
        {formData.image && (
          <header className="mt-2 h-[297px] w-full md:h-[400px] lg:h-[594px]">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Imagen del evento"
              className="h-full w-full rounded-[50px] object-cover"
            />
          </header>
        )}
        <main className="flex flex-col gap-y-8">
          <h2 className="text-center text-3xl font-extrabold md:text-start md:text-5xl">
            {formData.eventName}
          </h2>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-2xl font-bold">Fecha y Hora</h3>
            <p className="text-2xl font-semibold">{formData.date}</p>
            <p className="text-2xl font-semibold">{formData.hour}</p>
            <button
              className="text-center text-2xl font-semibold text-[#2C53AE] md:text-start"
              type="submit"
            >
              + Agregar a Calendario
            </button>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-2xl font-bold">Lugar</h3>
            <p className="text-2xl font-semibold">Dirección</p>
            <span>{formData.location}</span>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-3xl font-bold">Información de las entradas</h3>
            <p className="text-2xl font-bold">Tipo de entrada: Precio / entrada</p>
            <div className="flex flex-col gap-y-4">
              <p>Puerta:</p>
              <span>{formData.price.puerta}</span>
            </div>
            <div className="flex flex-col gap-y-4">
              <p>Locuras de Morón</p>
              <span>{formData.price.locuras}</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-3xl font-bold">Descripcióndel Evento</h3>
            <p className="text-lg font-normal">{formData.description}</p>
          </div>
        </main>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
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
