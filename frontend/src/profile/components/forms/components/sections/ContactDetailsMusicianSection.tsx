import LabeledInput from "../labeledFields/LabeledInput";
import { FormMusicianProfileSchema } from "../../schemas/ProfileSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ContactSectionProps {
  errors: FieldErrors<FormMusicianProfileSchema>;
  register: UseFormRegister<FormMusicianProfileSchema>;
  className?: string;
}

export const ContactDetailMusicianSection = ({
  errors,
  register,
  className,
}: ContactSectionProps) => {
  return (
    <fieldset className={`fieldsetSectionProfile ${className ?? ""}`}>
      <legend className="legendSectionProfile">DATOS DE CONTACTO</legend>

      <LabeledInput
        label="Correo Electrónico *"
        htmlFor="email"
        inputProps={{
          id: "email",
          type: "email",
          placeholder: "Correo Electrónico",
          readOnly: true,
          ...register("email"),
        }}
        error={errors.email?.message}
      />

      <LabeledInput
        label="WhatsApp"
        htmlFor="whatsapp"
        inputProps={{
          id: "whatsapp",
          type: "tel",
          placeholder: "WhatsApp",
          ...register("whatsapp"),
        }}
        error={errors.whatsapp?.message}
      />
    </fieldset>
  );
};
