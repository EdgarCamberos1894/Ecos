import LabeledInput from "../labeledFields/LabeledInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormMusicianProfileSchema } from "../../shemas/ProfileSchema";

interface DonationDataProps {
  errors: FieldErrors<FormMusicianProfileSchema>;
  register: UseFormRegister<FormMusicianProfileSchema>;
  className?: string;
}

export const DonationDataSection = ({ errors, register, className }: DonationDataProps) => {
  return (
    <fieldset className={`fieldsetSectionProfile ${className ?? ""}`}>
      <legend className="legendSectionProfile">DATOS PARA DONACIÓN</legend>

      <LabeledInput
        label="🔗 Link de pago rápido"
        htmlFor="paymentLink"
        inputProps={{
          id: "paymentLink",
          type: "text",
          placeholder: "https://ejemplo.com/pago",
          ...register("paymentLink"),
        }}
        error={errors.paymentLink?.message}
      />

      <LabeledInput
        label="Alias"
        htmlFor="paymentAlias"
        inputProps={{
          id: "paymentAlias",
          type: "text",
          placeholder: "alias.banco-123",
          ...register("paymentAlias"),
        }}
        error={errors.paymentAlias?.message}
      />

      <LabeledInput
        label="CBU"
        htmlFor="cbu"
        inputProps={{
          id: "cbu",
          type: "text",
          placeholder: "AR1234567890123456789012",
          ...register("cbu"),
        }}
        error={errors.cbu?.message}
      />
    </fieldset>
  );
};
