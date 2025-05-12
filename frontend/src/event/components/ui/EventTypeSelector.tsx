interface EventTypeSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EventTypeSelector({ value, onChange }: EventTypeSelectorProps) {
  return (
    <div className="w-full">
      <p className="mb-2 font-[roboto] text-[32px] font-medium text-gray-700">Fecha y Hora</p>

      <div className="mb-4 flex space-x-4">
        <span className="mb-1 block w-35 text-end text-sm font-medium text-gray-700">
          Tipo de evento <span className="text-red-500">*</span>
        </span>
        <div className="flex gap-6">
          {["único", "recurrente"].map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="eventType"
                value={type}
                checked={value === type}
                onChange={onChange}
                className="accent-blue-600"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
