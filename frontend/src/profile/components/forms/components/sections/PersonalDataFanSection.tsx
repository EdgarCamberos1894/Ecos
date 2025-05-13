import LabeledInput from "../labeledFields/LabeledInput";
import LabeledSelect from "../labeledFields/LabeledSelect";
import LabeledChecklist from "../labeledFields/LabelCheckList";
import useCountryList from "react-select-country-list";
import { musicalGenreOptions } from "@/profile/utils/musicalGenreOptions";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFanProfileSchema } from "../../shemas/ProfileSchema";

interface PersonalDataFanProps {
  country: string;
  genreInterest: string[];
  onGenresListChange: (val: string[]) => void;
  onCountryChange: (val: string) => void;
  errors: FieldErrors<FormFanProfileSchema>;
  register: UseFormRegister<FormFanProfileSchema>;
  className?: string;
}

export const PersonalDataFanSection = ({
  country,
  genreInterest,
  onGenresListChange,
  onCountryChange,
  errors,
  register,
  className,
}: PersonalDataFanProps) => {
  const countryOptions = useCountryList().getData();

  return (
    <fieldset className={`fieldsetSectionProfile ${className ?? ""}`}>
      <legend className="legendSectionProfile">DATOS PERSONALES</legend>
      <LabeledInput
        label="Nombre *"
        htmlFor="name"
        inputProps={{
          id: "name",
          type: "text",
          readOnly: true,
          placeholder: "Nombre",
          ...register("name"),
        }}
        error={errors.name?.message}
      />
      <LabeledChecklist
        label="Géneros musicales que le interesa *"
        options={musicalGenreOptions}
        value={genreInterest}
        onChange={onGenresListChange}
        error={errors.genreInterest?.message}
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
