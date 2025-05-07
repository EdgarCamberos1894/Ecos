type Option = string | { label: string; value: string };

interface LabeledSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  id?: string;
  error?: string;
}

const LabeledSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  id,
  error,
}: LabeledSelectProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-1 self-stretch">
      <label htmlFor={id} className="text-2xl">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="rounded-none border border-solid border-[#B4B4B4] px-4 py-2 placeholder:text-sm placeholder:text-black focus:placeholder-transparent"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const optionLabel = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={optionLabel} value={optionLabel}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default LabeledSelect;
