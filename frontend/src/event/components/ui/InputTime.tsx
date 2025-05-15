interface InputTimeProps {
  form: {
    dateString: string;
    startTime: string;
    endTime: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
}

export default function InputTime({ form, handleChange, errors }: InputTimeProps) {
  return (
    <div className="flex w-full space-x-4">
      <div className="flex-1 space-y-5 md:flex md:gap-4">
        {/* Fecha */}
        <div className="flex flex-col">
          <label htmlFor="dateString" className="mb-1 text-sm font-medium text-gray-800">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateString"
            id="dateString"
            value={form.dateString}
            onChange={handleChange}
            className={`flex border px-3 py-2`}
          />
          {errors?.dateString && <p className="text-sm text-red-600">{errors.dateString}</p>}
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
