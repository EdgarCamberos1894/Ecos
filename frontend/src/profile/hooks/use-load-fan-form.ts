import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormFanProfileSchema } from "../components/forms/shemas/ProfileSchema";
import { User } from "@/auth/types";

interface UseLoadFanFormProps {
  data?: Partial<FormFanProfileSchema>;
  setValue: UseFormSetValue<FormFanProfileSchema>;
  setProfileImage: (file: File | string | null) => void;
  setCountry: (value: string) => void;
  setGenreInterest: (value: string[]) => void;
  countryOptions: { label: string; value: string }[];
  user?: User;
}

export function useLoadFanForm({
  data,
  setValue,
  setProfileImage,
  setCountry,
  setGenreInterest,
  countryOptions,
  user,
}: UseLoadFanFormProps) {
  useEffect(() => {
    if (!data || !user) return;

    if (user.email) {
      setValue("email", user.email);
      setValue("name", user.name);
    }

    const countryOption = countryOptions.find((option) => option.label === data.country);
    const countryLabel = countryOption?.label ?? "";
    setValue("country", countryLabel);
    setCountry(countryLabel);

    setValue("photoUrl", data.photoUrl ?? "");
    if (data.photoUrl) {
      setProfileImage(data.photoUrl);
    }

    setGenreInterest(
      data.genreInterest && Array.isArray(data.genreInterest) && data.genreInterest.length > 0
        ? data.genreInterest
        : ["Otro"],
    );
  }, [data, setValue, countryOptions, user, setProfileImage, setCountry, setGenreInterest]);
}
