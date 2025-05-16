import { z, ZodError } from "zod";
import { useState } from "react";
import { FormData } from "@/event/type/FormData";
import { PlusCircleIcon } from "../ui/PlusCircleIcon";
import { MinusCircleIcon } from "../ui/MinusCircleIcon";
import { DollarIcon } from "../ui/DollarIcon";

interface StepThreeProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ticketSchema = z.object({
  location: z.string().min(1, "Ubicación requerida"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Precio requerido"),
  ),
});
const ticketsSchema = z.array(ticketSchema);

export default function StepThree({ nextStep, prevStep, formData, setFormData }: StepThreeProps) {
  const [entryPoints, setEntryPoints] = useState(
    formData.tickets.length > 0
      ? formData.tickets.map((t) => ({ ...t, id: crypto.randomUUID() }))
      : [{ id: crypto.randomUUID(), location: "", price: 0 }],
  );

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (index: number, field: "location" | "price", value: string): void => {
    const updated = [...entryPoints];
    if (field === "price") {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value;
    }
    setEntryPoints(updated);

    const errorKey = `${index.toString()}-${field}`;
    if (formErrors[errorKey]) {
      setFormErrors((prev) => {
        const { [errorKey]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const addNewTicket = () => {
    setEntryPoints((prev) => [...prev, { id: crypto.randomUUID(), location: "", price: 0 }]);
  };

  const removeTicket = (index: number) => {
    setEntryPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedTickets = ticketsSchema.parse(entryPoints);
      setFormData((prev) => ({
        ...prev,
        tickets: parsedTickets,
      }));
      nextStep();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path;
          if (Array.isArray(path) && typeof path[0] === "number" && typeof path[1] === "string") {
            errors[`${path[0].toString()}-${path[1]}`] = error.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <div className="max-w-7xl space-y-8 p-6">
      <form onSubmit={handleSubmit} className="h-full w-full">
        <ul className="w-full max-w-[864px] space-y-4">
          {entryPoints.map((ticket, index) => (
            <li key={ticket.id} className="flex w-full items-center gap-4">
              <div className="relative w-1/3">
                <input
                  type="text"
                  placeholder="Lugar de venta"
                  className="w-full border border-x-transparent border-t-transparent border-b-black px-2 py-1 focus:border focus:border-b-1 focus:outline-none"
                  value={ticket.location}
                  onChange={(e) => {
                    handleChange(index, "location", e.target.value);
                  }}
                />
                {formErrors[`${index.toString()}-location`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors[`${index.toString()}-location`]}
                  </p>
                )}
              </div>
              <div className="relative w-1/3">
                <div className="absolute top-1/2 -translate-y-1/2">
                  <DollarIcon />
                </div>
                <input
                  type="number"
                  className="border-[rgba(130, 130, 130, 0.70)] rounded-[20px] border pl-8"
                  name={`tickets-${index.toString()}-price`}
                  required={false}
                  step="0.01"
                  value={ticket.price === 0 ? "" : ticket.price}
                  onChange={(e) => {
                    handleChange(index, "price", e.target.value);
                  }}
                  placeholder="Ingrese precio"
                />
                {formErrors[`${index.toString()}-price`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors[`${index.toString()}-price`]}
                  </p>
                )}
              </div>
              <div className="relative flex -translate-x-[-40px] items-center gap-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      removeTicket(index);
                    }}
                    aria-label="Eliminar ticket"
                  >
                    <MinusCircleIcon />
                  </button>
                )}
                {index === entryPoints.length - 1 && (
                  <button
                    type="button"
                    className="relative flex -translate-x-[-5px]"
                    onClick={addNewTicket}
                    aria-label="Agregar ticket"
                  >
                    <PlusCircleIcon />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="submit"
            className="rounded-[37px] bg-[#FE963D] px-6 py-2 text-white hover:opacity-90"
          >
            Guardar y continuar
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
    </div>
  );
}
