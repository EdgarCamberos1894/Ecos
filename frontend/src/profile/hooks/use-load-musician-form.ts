import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormMusicianProfileSchema } from "../components/forms/shemas/ProfileSchema";
import { User } from "@/auth/types";
import { musicalGenreOptions } from "@/profile/utils/musicalGenreOptions";

interface UseLoadMusicianFormProps {
  data?: Partial<FormMusicianProfileSchema>;
  setValue: UseFormSetValue<FormMusicianProfileSchema>;
  setProfileImage: (file: File | string | null) => void;
  setCountry: (value: string) => void;
  setGenre: (value: string) => void;
  countryOptions: { label: string; value: string }[];
  user?: User;
}

export function useLoadMusicianForm({
  data,
  setValue,
  setProfileImage,
  setCountry,
  setGenre,
  countryOptions,
  user,
}: UseLoadMusicianFormProps) {
  useEffect(() => {
    if (!data || !user) return;

    setValue("stageName", data.stageName ?? "");

    const countryOption = countryOptions.find((option) => option.label === data.country);
    const genreOption = musicalGenreOptions.find((option) => option === data.genre);

    const countryLabel = countryOption ? countryOption.label : "";
    const genreLabel = genreOption ?? "";

    setValue("country", countryLabel);
    setCountry(countryLabel);

    setValue("genre", genreLabel);
    setGenre(genreLabel);

    setValue("paymentLink", data.paymentLink ?? "");
    setValue("paymentAlias", data.paymentAlias ?? "");
    setValue("cbu", data.cbu ?? "");

    setValue("whatsapp", data.whatsapp ?? "");
    setValue("spotifyUrl", data.spotifyUrl ?? "");
    setValue("youtubeUrl", data.youtubeUrl ?? "");
    setValue("instagramUrl", data.instagramUrl ?? "");
    setValue("tiktokUrl", data.tiktokUrl ?? "");

    if (data.photoUrl) {
      setProfileImage(data.photoUrl);
    }

    if (user.email) {
      setValue("email", user.email);
    }
  }, [data, setValue, countryOptions, user, setProfileImage, setCountry, setGenre]);
}
