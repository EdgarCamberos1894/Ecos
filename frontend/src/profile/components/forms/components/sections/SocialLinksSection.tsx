import LabeledInput from "../labeledFields/LabeledInput";
import { FormMusicianProfileSchema } from "../../schemas/ProfileSchema";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface SocialLinksProps {
  errors: FieldErrors<FormMusicianProfileSchema>;
  register: UseFormRegister<FormMusicianProfileSchema>;
  className?: string;
}

export const SocialLinksSection = ({ errors, register, className }: SocialLinksProps) => {
  const socialFields = [
    { label: "Spotify", id: "spotifyUrl", placeholder: "Spotify URL" },
    { label: "YouTube", id: "youtubeUrl", placeholder: "YouTube URL" },
    { label: "Instagram", id: "instagramUrl", placeholder: "Instagram URL" },
  ];

  return (
    <fieldset className={`fieldsetSectionProfile ${className ?? ""}`}>
      <legend className="legendSectionProfile">REDES SOCIALES</legend>
      {socialFields.map(({ label, id, placeholder }) => (
        <LabeledInput
          key={id}
          label={label}
          htmlFor={id}
          inputProps={{
            id,
            type: "text",
            placeholder,
            ...register(id as keyof FormMusicianProfileSchema),
          }}
          error={errors[id as keyof FormMusicianProfileSchema]?.message}
        />
      ))}
    </fieldset>
  );
};
