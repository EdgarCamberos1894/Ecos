import { useState } from "react";
import InputField from "../ui/ImputField";
import EventTypeSelector from "../ui/EventTypeSelector";
import InputTime from "../ui/InputTime";
import { eventSchema } from "../../validation/EventSchema";
import { ZodError } from "zod";
import { FormData } from "../../type/FormData";

interface StepOneProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
}

export default function StepOne({ nextStep, formData, setFormData }: StepOneProps) {
  const [form, setForm] = useState({
    eventName: formData.eventName || "",
    category: formData.category || "",
    eventType: "único",
    date: formData.date || "",
    startTime: formData.hour || "",
    endTime: "",
    location: formData.location || "",
    description: formData.description || "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsedData = eventSchema.parse(form);
      // Actualizá los datos globales del formulario
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const newErrors = { ...formErrors };

    if (name === "startTime" && value >= form.endTime) {
      newErrors.startTime = "La hora de inicio debe ser anterior a la hora de fin.";
    } else if (name === "startTime") {
      delete newErrors.startTime;
    }

    if (name === "endTime" && value <= form.startTime) {
      newErrors.endTime = "La hora de fin debe ser posterior a la hora de inicio.";
    } else if (name === "endTime") {
      delete newErrors.endTime;
    }

    if (name === "date" && value === "") {
      newErrors.date = "La fecha es obligatoria.";
    } else if (name === "date") {
      delete newErrors.date;
    }

    try {
      const fieldSchema = eventSchema.shape[name as keyof typeof eventSchema.shape];
      fieldSchema.parse(value);

      delete newErrors.name;
      setFormErrors(newErrors);
    } catch (err) {
      if (err instanceof ZodError) {
        newErrors[name] = err.errors[0].message || "Error en el campo";
        setFormErrors(newErrors);
      }
    }

    setFormErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <p className="mb-2 font-[roboto] text-[32px] font-medium text-gray-700">Detalles</p>
        <div className="grid w-full grid-cols-1 items-center justify-start gap-4">
          <InputField
            label="Nombre del evento "
            name="eventName"
            value={form.eventName}
            required
            onChange={handleChange}
            error={formErrors.eventName}
            placeholder="Introduce el nombre de tu evento"
          />

          <InputField
            label="Categoría "
            name="category"
            value={form.category}
            required
            onChange={handleChange}
            error={formErrors.category}
            placeholder="Introduce la categoría del evento"
          />
        </div>
      </div>

      {/* Tipo de evento */}
      <EventTypeSelector value={form.eventType} onChange={handleChange} />

      {/* Fecha y hora */}
      <InputTime form={form} handleChange={handleChange} errors={formErrors} />

      {/* Lugar */}
      <p className="mb-2 font-[roboto] text-[32px] font-medium text-gray-700">Lugar</p>
      <InputField
        label="¿Dónde se realiza el evento?"
        name="location"
        value={form.location}
        required
        onChange={handleChange}
        error={formErrors.location}
        placeholder="Introduce la ubicación del evento"
      />

      {/* Información adicional */}
      <p className="mb-2 font-[roboto] text-[32px] font-medium text-gray-700">
        Información adicional
      </p>
      <div className="flex space-x-4">
        <label className="w-35 text-end text-sm font-medium text-gray-800">
          Descripción <span className="text-red-500">*</span>
        </label>
        <div className="w-full">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`h-28 w-full border p-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:outline-none`}
            placeholder="Describe un poco más tu evento para atraer al público"
          />
          {formErrors.description && (
            <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          onClick={nextStep}
          className="rounded-[37px] bg-[#FE963D] px-6 py-2 text-white hover:opacity-90"
        >
          Guardar y continuar
        </button>
        <button
          type="button"
          className="rounded-[37px] bg-[#19233A] px-6 py-2 text-white hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
