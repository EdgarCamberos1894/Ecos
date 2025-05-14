import { useState } from "react";
import type { FormData as FormDataType } from "@/event/type/FormData";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import { useApiQuery } from "@/shared/hooks/use-api-query";

interface StepFourProps {
  prevStep: () => void;
  formData: FormDataType;
}

export default function StepFour({ prevStep, formData }: StepFourProps) {
  const user = useRequiredUser();
  const userId = user.id;

  const { data: musicianProfile } = useApiQuery(
    "musician-profile",
    `/musician-profile/${userId}`,
    userId,
  );

  const [error, setError] = useState<string | null>(null);

  const { mutate } = useApiMutation<string, FormData>("/eventos", "POST");

  const handleSubmit = () => {
    if (!musicianProfile) {
      toast.error("No se pudo obtener el perfil del músico.");
      return;
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("type", formData.type);
    data.append("dateString", formData.dateString);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);

    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("musicianId", userId.toString());

    data.append("active", "true");
    data.append("deleteImage", "false");

    const tickets = [
      {
        type: "Puerta",
        price: formData.price.puerta,
      },
      {
        type: "Locuras",
        price: formData.price.locuras,
      },
    ];

    tickets.forEach((ticket, index) => {
      data.append(`tickets[${index.toString()}][type]`, ticket.type.toString());
      data.append(`tickets[${index.toString()}][price]`, ticket.price.toString());
    });

    if (formData.image) {
      data.append("image", formData.image);
    }

    mutate(data, {
      onSuccess: () => {
        setError(null);
      },
      onError: () => {
        toast.error("Error al publicar evento");
      },
    });
  };

  return (
    <form>
      <p className="mb-4 text-sm font-normal">
        Casi terminamos! Revisa que los datos sean correctos.
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
            {formData.name}
          </h2>
          <h3 className="text-center text-3xl font-extrabold md:text-start md:text-5xl">
            {formData.category}
          </h3>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-2xl font-bold">Fecha y Hora</h3>
            <p className="text-2xl font-semibold">{formData.dateString}</p>
            <p className="text-2xl font-semibold">{formData.startTime}</p>
            <p className="text-2xl font-semibold">{formData.endTime}</p>
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
            <h3 className="text-3xl font-bold">Descripción del Evento</h3>
            <p className="text-lg font-normal">{formData.description}</p>
          </div>
        </main>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          type="button"
          onClick={handleSubmit}
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
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </form>
  );
}
