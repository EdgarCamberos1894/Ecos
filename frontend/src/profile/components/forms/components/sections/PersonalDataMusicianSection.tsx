import LabeledInput from "../labeledFields/LabeledInput";
import LabeledSelect from "../labeledFields/LabeledSelect";
import useCountryList from "react-select-country-list";
import { musicalGenreOptions } from "@/profile/utils/musicalGenreOptions";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormMusicianProfileSchema } from "../../shemas/ProfileSchema";

interface PersonalDataMusicianProps {
  genre: string;
  country: string;
  onGenreChange: (val: string) => void;
  onCountryChange: (val: string) => void;
  errors: FieldErrors<FormMusicianProfileSchema>;
  register: UseFormRegister<FormMusicianProfileSchema>;
  className?: string;
}

export const PersonalDataMusicianSection = ({
  genre,
  country,
  onGenreChange,
  onCountryChange,
  errors,
  register,
  className,
}: PersonalDataMusicianProps) => {
  const countryOptions = useCountryList().getData();

  return (
    <fieldset className={`fieldsetSectionProfile ${className ?? ""}`}>
      <legend className="legendSectionProfile">DATOS PERSONALES</legend>
      <LabeledInput
        label="Nombre Artista / Banda *"
        htmlFor="stageName"
        inputProps={{
          id: "stageName",
          type: "text",
          placeholder: "Nombre",
          ...register("stageName"),
        }}
        error={errors.stageName?.message}
      />
      <LabeledSelect
        label="Género musical *"
        value={genre}
        onChange={onGenreChange}
        options={musicalGenreOptions}
        placeholder="Género"
        id="genre"
        error={errors.genre?.message}
      />
      <LabeledSelect
        label="País *"
        value={country}
        onChange={onCountryChange}
        options={countryOptions}
        placeholder="País"
        id="country"
        error={errors.country?.message}
      />
    </fieldset>
  );
};
