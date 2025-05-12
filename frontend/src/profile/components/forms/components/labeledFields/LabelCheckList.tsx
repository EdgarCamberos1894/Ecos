import Button from "@/app/ui/Button";

type Option = string | { label: string; value: string };

interface LabeledChecklistProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  id?: string;
  error?: string;
}

const LabeledChecklist = ({
  label,
  options,
  value,
  onChange,
  id,
  error,
}: LabeledChecklistProps) => {
  const handleButtonClick = (clickedValue: string) => {
    if (value.includes(clickedValue)) {
      onChange(value.filter((v) => v !== clickedValue));
    } else {
      onChange([...value, clickedValue]);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-1 self-stretch">
      <label htmlFor={id} className="text-2xl">
        {label}
      </label>
      <div className="flex w-full flex-wrap gap-2">
        {options.map((opt) => {
          const optionLabel = typeof opt === "string" ? opt : opt.label;
          const optionValue = typeof opt === "string" ? opt : opt.label;
          const isSelected = value.includes(optionValue);
          return (
            <Button
              key={optionValue}
              type="button"
              onClick={() => {
                handleButtonClick(optionValue);
              }}
              className={`rounded border px-4 py-2 ${
                isSelected ? "bg-[#19233A] text-white" : "bg-[#79747E] text-white"
              }`}
            >
              {optionLabel}
            </Button>
          );
        })}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default LabeledChecklist;
