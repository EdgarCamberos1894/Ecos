import InputField from "../ui/ImputField";
import { eventSchema } from "../../validation/EventSchema";
import { ZodError } from "zod";
import { useState } from "react";
import { FormData } from "@/CreateEvent/type/FormData";
import { PlusCircleIcon } from "../ui/PlusCircleIcon";

interface StepThreeProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const entryPoints = [
  { id: 1, entry: "Puerta", placeholder: 1500.0 },
  { id: 2, entry: "Locuras Marón", placeholder: 1200.0 },
];

export default function StepThree({ nextStep, prevStep, formData, setFormData }: StepThreeProps) {
  const [form, setForm] = useState(
    entryPoints.reduce<Record<string, string | number>>((acc, { entry }) => {
      acc[`price-${entry}`] = formData.price || "";
      return acc;
    }, {}),
  );

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsedData = eventSchema.parse({
        price: Number(form["price-Puerta"]),
      });

      setFormData((prev) => ({
        ...prev,
        ...parsedData,
        hour: parsedData.startTime,
      }));

      nextStep();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setFormErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="max-w-7xl space-y-8 p-6">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <ul className="w-full max-w-[864px] space-y-4">
          {entryPoints.map(({ id, entry, placeholder }) => (
            <li key={id} className="flex w-full items-center gap-4">
              <InputField
                label={entry}
                name={`price-${entry}`}
                type="number"
                required={false}
                value={form[`price-${entry}`]}
                onChange={handleChange}
                error={formErrors[`price-${entry}`]}
                placeholder={placeholder.toString()}
              />
              <PlusCircleIcon />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="submit"
            onClick={nextStep}
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
