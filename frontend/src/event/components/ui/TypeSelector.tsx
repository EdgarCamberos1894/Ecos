import { useState } from "react";
import { z } from "zod";
import { FormData } from "@/event/type/FormData";

interface TypeSelectorProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  error?: string;
}

const typeSchema = z.object({
  type: z.enum(["Single", "Recurring"], {
    required_error: "El tipo de evento es obligatorio",
    invalid_type_error: "Tipo de evento inválido",
  }),
});

export default function TypeSelector({ form, setForm }: TypeSelectorProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "Single" | "Recurring";

    const result = typeSchema.safeParse({ type: value });

    if (!result.success) {
      setLocalError(result.error.format().type?._errors[0] ?? "Tipo inválido");
    } else {
      setLocalError(null);
    }

    setForm((prev) => ({
      ...prev,
      type: value,
    }));
  };

  return (
    <div className="w-full">
      <p className="mb-2 font-[Roboto] text-2xl font-medium">Fecha y Hora</p>
      <div className="mb-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Tipo de evento <span className="text-red-500">*</span>
          </span>
          <div className="flex gap-6">
            {[
              { label: "Único", value: "Single" },
              { label: "Recurrente", value: "Recurring" },
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="type"
                  value={value}
                  checked={form.type === value}
                  onChange={handleRadioChange}
                  className="accent-blue-600"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {localError && <p className="mt-1 text-sm text-red-600">{localError}</p>}
      </div>
    </div>
  );
}
