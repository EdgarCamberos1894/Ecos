import InputField from "../ui/ImputField";
import { z, ZodError } from "zod";
import { useState } from "react";
import { FormData } from "@/event/type/FormData";
import { PlusCircleIcon } from "../ui/PlusCircleIcon";

interface StepThreeProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ticketsSchema = z.array(
  z.object({
    location: z.string(),
    price: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().min(1, "Precio requerido"),
    ),
  }),
);

const entryPoints = [
  { id: 1, entryKey: "puerta", entry: "Puerta", placeholder: 1500.0 },
  { id: 2, entryKey: "locuras", entry: "Locuras de Morón", placeholder: 1200.0 },
];

export default function StepThree({ nextStep, prevStep, formData, setFormData }: StepThreeProps) {
  const [form, setForm] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    entryPoints.forEach(({ entryKey }) => {
      const ticket = formData.tickets.find((t) => t.location.toLowerCase().includes(entryKey));
      initial[`tickets-${entryKey}`] = ticket?.price ?? 0;
    });
    return initial;
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    setForm((prev) => ({
      ...prev,
      [name]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  function isZodError(error: unknown): error is ZodError {
    return (
      typeof error === "object" &&
      error !== null &&
      "errors" in error &&
      Array.isArray((error as { errors?: unknown }).errors)
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ticketsArray = entryPoints.map(({ entryKey, entry }) => ({
      location: entry,
      price: Number(form[`tickets-${entryKey}`]) || 0,
    }));

    try {
      const parsedTickets = ticketsSchema.parse(ticketsArray);

      setFormData((prev) => ({
        ...prev,
        tickets: parsedTickets,
      }));

      nextStep();
    } catch (err) {
      if (isZodError(err)) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          // Validamos que el path tenga la forma esperada [index, 'price']
          if (
            Array.isArray(error.path) &&
            error.path.length === 2 &&
            typeof error.path[0] === "number" &&
            error.path[1] === "price"
          ) {
            const index = error.path[0];
            const key = `tickets-${entryPoints[index].entryKey}`;
            fieldErrors[key] = error.message;
          }
        });
        setFormErrors(fieldErrors);
      } else {
        console.error("Error inesperado:", err);
      }
    }
  };

  return (
    <div className="max-w-7xl space-y-8 p-6">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <ul className="w-full max-w-[864px] space-y-4">
          {entryPoints.map(({ id, entryKey, entry, placeholder }) => (
            <li key={id} className="flex w-full items-center gap-4">
              <InputField
                label={entry}
                name={`tickets-${entryKey}`}
                type="number"
                required={false}
                value={form[`tickets-${entryKey}`] ?? 0}
                onChange={handleChange}
                error={formErrors[`tickets-${entryKey}`]}
                placeholder={placeholder.toString()}
                labelClassName="border-b border-[#000000] pb-2"
              />
              <PlusCircleIcon />
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
