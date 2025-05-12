interface InputTimeProps {
  form: {
    date: string;
    startTime: string;
    endTime: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
}

export default function InputTime({ form, handleChange, errors }: InputTimeProps) {
  return (
    <div className="flex space-x-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Fecha */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-1 text-sm font-medium text-gray-800">
            Fecha del evento <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            className={`border px-3 py-2`}
          />
          {errors?.date && <p className="text-sm text-red-600">{errors.date}</p>}
        </div>

        {/* Hora de inicio */}
        <div className="flex flex-col">
          <label htmlFor="startTime" className="mb-1 text-sm font-medium text-gray-800">
            Hora de inicio <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={form.startTime}
            onChange={handleChange}
            className={`border px-3 py-2`}
          />
          {errors?.startTime && <p className="text-sm text-red-600">{errors.startTime}</p>}
        </div>

        {/* Hora de finalización */}
        <div className="flex flex-col">
          <label htmlFor="endTime" className="mb-1 text-sm font-medium text-gray-800">
            Hora de finalización <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            value={form.endTime}
            onChange={handleChange}
            className={`border px-3 py-2`}
          />
          {errors?.endTime && <p className="text-sm text-red-600">{errors.endTime}</p>}
        </div>
      </div>
    </div>
  );
}
