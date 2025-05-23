import { ClipboardCopyIcon } from "../ui/ClipboardCopyIcon";
import { useState } from "react";

interface LabeledFieldReadOnlyProps {
  label: string;
  value?: string;
  className?: string;
  error?: string;
}

const LabeledFieldReadOnly = ({
  label,
  value = "",
  className = "",
  error,
}: LabeledFieldReadOnlyProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    <div className={`text-ecos-blue flex w-full flex-col${className}`}>
      <span className="mb-2">{label}</span>

      <div className="relative w-full">
        <div className="border-ecos-dark-grey w-full rounded-[20px] border px-3.5 py-2 text-sm break-words">
          {value || "No especificado"}
        </div>

        {value && (
          <button
            type="button"
            onClick={handleCopy}
            className="text-ecos-blue hover:text-ecos-blue-dark absolute top-1/2 right-2 -translate-y-1/2"
            aria-label="Copiar al portapapeles"
          >
            <ClipboardCopyIcon className="h-4 w-4 hover:cursor-pointer" />
          </button>
        )}

        {error && <span className="text-sm text-red-500">{error}</span>}

        {copied && (
          <span className="absolute right-2 -bottom-5 text-xs text-green-600">¡Copiado!</span>
        )}
      </div>
    </div>
  );
};

export default LabeledFieldReadOnly;
