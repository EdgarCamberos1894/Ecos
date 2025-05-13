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

const priceSchema = z.object({
  puerta: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Precio requerido"),
  ),
  locuras: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(1, "Precio requerido"),
  ),
});

const entryPoints = [
  { id: 1, entryKey: "puerta", entry: "Puerta", placeholder: 1500.0 },
  { id: 2, entryKey: "locuras", entry: "Locuras de Morón", placeholder: 1200.0 },
];

export default function StepThree({ nextStep, prevStep, formData, setFormData }: StepThreeProps) {
  const [form, setForm] = useState(
    entryPoints.reduce<Record<string, number>>((acc, { entryKey }) => {
      acc[`price-${entryKey}`] = formData.price[entryKey as keyof typeof formData.price];
      return acc;
    }, {}),
  );

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    setForm((prev) => ({
      ...prev,
      [name]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const priceValues = entryPoints.reduce<Record<string, number>>((acc, { entryKey }) => {
      acc[entryKey] = Number(form[`price-${entryKey}`]) || 0;
      return acc;
    }, {});

    try {
      const parsedPrices = priceSchema.parse(priceValues);

      setFormData((prev) => ({
        ...prev,
        price: parsedPrices,
      }));

      nextStep();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const fieldName = error.path[0] as string;
          fieldErrors[`price-${fieldName}`] = error.message;
        });
        setFormErrors(fieldErrors);
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
                name={`price-${entryKey}`}
                type="number"
                required={false}
                value={form[`price-${entryKey}`] ?? 0}
                onChange={handleChange}
                error={formErrors[`price-${entryKey}`]}
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
