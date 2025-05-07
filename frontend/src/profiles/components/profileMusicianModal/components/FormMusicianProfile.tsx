import Button from "@/app/ui/Button";
import { Avatar } from "@/auth/components/ui/Avatar";
import { useState } from "react";
import useCountryList from "react-select-country-list";
import LabeledInput from "../../forms/LabeledInput";
import LabeledSelect from "../../forms/LabeledSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formProfileSchema, FormProfileSchema } from "./FormMusicProfileSchema";
import { musicalGenreOptions } from "@/profiles/utils/musicalGenreOptions";
import { Edit } from "@/profiles/ui/Edit";
import ModalProfilePhoto from "../../profilePhotoModal/ProfilePhotoModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useProfileForm } from "@/profiles/hooks/useProfileForm";
import { useEffect } from "react";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";

const FormMusicianProfile = () => {
  const countryOptions = useCountryList().getData();
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [openProfileImagen, setOpenProfileImagen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { user } = useAuth();

  const id = user?.id ?? "";

  const handleCountryChange = (val: string) => {
    setCountry(val);
  };

  const formMethods = useForm<FormProfileSchema>({
    resolver: zodResolver(formProfileSchema),
  });

  const { data, isLoading, isError } = useProfileForm<FormProfileSchema>(
    "musician",
    id,
    `musician-profile/${id}`,
    formMethods,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (isLoading || isError) return;

    if (data) {
      setValue("stageName", data.stageName || "");

      const countryOption = countryOptions.find((option) => option.label === data.country);
      const genreOption = musicalGenreOptions.find((option) => option === data.genre);

      const countryLabel = countryOption ? countryOption.label : "";
      const genreLabel = genreOption ?? "";

      setValue("country", countryLabel);
      setCountry(countryLabel);

      setValue("genre", genreLabel);
      setGenre(genreLabel);

      setValue("whatsapp", data.whatsapp ?? "");
      setValue("spotifyUrl", data.spotifyUrl ?? "");
      setValue("youtubeUrl", data.youtubeUrl ?? "");
      setValue("instagramUrl", data.instagramUrl ?? "");
      setValue("tiktokUrl", data.tiktokUrl ?? "");

      if (data.photoUrl) {
        setProfileImage(data.photoUrl);
      }

      if (user?.email) {
        setValue("email", user.email);
      }
    }
  }, [data, setValue, isLoading, isError, countryOptions, user]);

  const token = (localStorage.getItem("userToken") ?? "").replace(/(^"|"$)/g, "");
  console.log(`Bearer ${token}`);

  const updateProfile = useApiMutation<FormData>(`musician-profile`, "PUT", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const onSubmit = (data: FormProfileSchema) => {
    const formData = new FormData();
    formData.append("stageName", data.stageName);
    formData.append("country", data.country);
    formData.append("genre", data.genre);
    if (data.whatsapp) formData.append("whatsapp", data.whatsapp);
    if (data.spotifyUrl) formData.append("spotifyUrl", data.spotifyUrl);
    if (data.youtubeUrl) formData.append("youtubeUrl", data.youtubeUrl);
    if (data.instagramUrl) formData.append("instagramUrl", data.instagramUrl);
    if (data.tiktokUrl) formData.append("tiktokUrl", data.tiktokUrl);
    updateProfile.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-14">
      <section className="grid grid-cols-2 justify-between">
        <fieldset className="flex flex-col items-start gap-11">
          <legend className="text-start text-2xl font-medium">DATOS DEL ARTISTA / BANDA </legend>
          <LabeledInput
            label="Nombre Artista / Banda *"
            htmlFor="stageName"
            inputProps={{
              id: "stageName",
              type: "text",
              placeholder: "Nombre Artista / Banda",
              ...register("stageName"),
            }}
            error={errors.stageName?.message}
          />

          <LabeledSelect
            label="Género Musical *"
            value={genre}
            onChange={setGenre}
            options={musicalGenreOptions}
            placeholder="Género"
            id="genre"
            error={errors.genre?.message}
          />

          <LabeledSelect
            label="País *"
            id="country"
            value={country}
            onChange={handleCountryChange}
            options={countryOptions}
            placeholder="País"
            error={errors.country?.message}
          />
        </fieldset>

        <fieldset className="flex flex-col items-center gap-11">
          <legend className="text-start text-2xl font-medium">FOTO DE PERFIL</legend>
          <div className="relative">
            <div className="rounded-full">
              {profileImage ? (
                <img src={profileImage} className="h-60 w-60 rounded-full object-cover" />
              ) : (
                <Avatar className="h-44 w-44 bg-[#A8A8A8] p-16" />
              )}
            </div>
            <button
              type="button"
              className="absolute right-14 -bottom-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#CAC4D0] drop-shadow-md"
              onClick={() => {
                setOpenProfileImagen(true);
              }}
            >
              <Edit className="stroke-black" />
            </button>
            {openProfileImagen && (
              <ModalProfilePhoto
                mode="edit"
                onClose={() => {
                  setOpenProfileImagen(false);
                }}
              />
            )}
          </div>
        </fieldset>
      </section>

      <fieldset className="flex flex-col items-start gap-11">
        <legend className="text-start text-2xl font-medium">DATOS DE CONTACTO</legend>

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
          label="Whatsapp"
          htmlFor="whatsapp"
          inputProps={{
            id: "whatsapp",
            type: "tel",
            placeholder: "Número de Whatsapp",
            ...register("whatsapp"),
          }}
          error={errors.whatsapp?.message}
        />
      </fieldset>

      <fieldset className="flex flex-col items-start gap-11">
        <legend className="text-start text-2xl font-medium">REDES SOCIALES</legend>

        <LabeledInput
          label="Spotify"
          htmlFor="spotify"
          inputProps={{
            id: "spotifyUrl",
            type: "url",
            placeholder: "Spotify",
            ...register("spotifyUrl"),
          }}
          error={errors.spotifyUrl?.message}
        />

        <LabeledInput
          label="YouTube"
          htmlFor="youtube"
          inputProps={{
            id: "youtubeUrl",
            type: "url",
            placeholder: "YouTube",
            ...register("youtubeUrl"),
          }}
          error={errors.youtubeUrl?.message}
        />

        <LabeledInput
          label="Instagram"
          htmlFor="instagram"
          inputProps={{
            id: "instagramUrl",
            type: "url",
            placeholder: "Instagram",
            ...register("instagramUrl"),
          }}
          error={errors.instagramUrl?.message}
        />

        <LabeledInput
          label="TikTok"
          htmlFor="tiktok"
          inputProps={{
            id: "tiktokUrl",
            type: "url",
            placeholder: "TikTok",
            ...register("tiktokUrl"),
          }}
          error={errors.tiktokUrl?.message}
        />
      </fieldset>

      <section className="flex items-center gap-11">
        <Button type="submit" children="GUARDAR" className="text-white" />
        <Button children="CANCELAR" className="text-white" />
      </section>
    </form>
  );
};

export default FormMusicianProfile;
