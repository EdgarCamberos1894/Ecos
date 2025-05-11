import Button from "@/app/ui/Button";
import { Avatar } from "@/auth/components/ui/Avatar";
import { useState } from "react";
import useCountryList from "react-select-country-list";
import LabeledInput from "../../forms/LabeledInput";
import LabeledSelect from "../../forms/LabeledSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMusicianProfileSchema, FormMusicianProfileSchema } from "./FormMusicianProfileSchema";
import { musicalGenreOptions } from "@/profiles/utils/musicalGenreOptions";
import { Edit } from "@/profiles/components/ui/Edit";
import ProfilePhotoModal from "../../forms/profilePhotoModal/ProfilePhotoModal";
import { useAuth } from "@/auth/hooks/use-auth";
import { useProfileForm } from "@/profiles/hooks/useProfileForm";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import ProfileImagen from "../../forms/profilePhotoModal/components/ProfileImagen";
import { useLoadMusicianForm } from "@/profiles/hooks/useLoadMusicianForm";
import { handleMusicianProfileSubmit } from "@/profiles/utils/handleMusicianProfileSubmit";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface FormMusicianProfileProps {
  onClose: () => void;
}

const FormMusicianProfile = ({ onClose }: FormMusicianProfileProps) => {
  const countryOptions = useCountryList().getData();
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [openProfileImagenModal, setOpenProfileImagenModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | string | null>(null);

  const { user } = useAuth();
  const id = user?.id ?? "";

  const navigate = useNavigate();

  const handleCountryChange = (val: string) => {
    setCountry(val);
    setValue("country", val, { shouldValidate: true });
  };

  const handleGenreChange = (val: string) => {
    setGenre(val);
    setValue("genre", val, { shouldValidate: true });
  };

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenProfileImagenModal(false);
  };

  const formMethods = useForm<FormMusicianProfileSchema>({
    resolver: zodResolver(formMusicianProfileSchema),
  });

  const { data } = useProfileForm<FormMusicianProfileSchema>(
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
    setError,
  } = formMethods;

  useLoadMusicianForm({
    data,
    setValue,
    setProfileImage,
    setCountry,
    setGenre,
    countryOptions,
    user: user ?? undefined,
  });

  const token =
    "Bearer " + (localStorage.getItem("userToken") ?? "").replace(/(^"|"$)/g, "").trim();

  const { mutate, isPending } = useApiMutation<FormData>("musician-profile", "PUT", {
    headers: {
      Authorization: token,
    },
  });

  const onSubmit = (data: FormMusicianProfileSchema) => {
    handleMusicianProfileSubmit({
      data,
      profileImage,
      mutate: (formData) => {
        mutate(formData, {
          onSuccess: () => {
            toast.success("¡Perfil actualizado con éxito!");
            navigate("/profile/edit");
            onClose();
          },
          onError: (error) => {
            console.error("Error al actualizar perfil:", error);
            toast.error("Ocurrió un error al guardar. Intentá nuevamente.");
            setError("root", {
              message: "Ocurrió un error al guardar. Intentá nuevamente.",
            });
          },
        });
      },
    });
  };

  const socialFields = [
    { label: "Spotify", id: "spotifyUrl", placeholder: "Spotify URL" },
    { label: "YouTube", id: "youtubeUrl", placeholder: "YouTube URL" },
    { label: "Instagram", id: "instagramUrl", placeholder: "Instagram URL" },
    { label: "TikTok", id: "tiktokUrl", placeholder: "TikTok URL" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-1 gap-x-48 gap-y-14 overflow-y-auto px-3.5 py-10 lg:grid-cols-2 lg:py-20 lg:pl-20"
    >
      <fieldset className="order-2 flex w-full flex-col items-start gap-11 lg:order-1">
        <legend className="mb-10 text-start text-2xl font-medium">DATOS DEL ARTISTA / BANDA</legend>

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
          onChange={handleGenreChange}
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

      <fieldset className="lg:order2 order-1 flex flex-col items-center gap-11 md:grid md:grid-cols-2">
        <legend className="mb-10 text-start text-2xl font-medium">FOTO DE PERFIL</legend>
        <div className="relative">
          <div className="h-60 w-60 rounded-full bg-[#A8A8A8]">
            {profileImage ? (
              <ProfileImagen profileImage={profileImage} />
            ) : (
              <Avatar className="h-60 w-60 p-16" />
            )}
          </div>
          <button
            type="button"
            className="absolute right-14 -bottom-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#CAC4D0] drop-shadow-md"
            onClick={() => {
              setOpenProfileImagenModal(true);
            }}
          >
            <Edit className="stroke-black" />
          </button>
        </div>
      </fieldset>

      <fieldset className="order-3 col-start-1 flex flex-col items-start gap-11 md:order-none lg:order-3">
        <legend className="mb-10 text-start text-2xl font-medium">DATOS DE CONTACTO</legend>

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
            placeholder: "Whatsapp",
            ...register("whatsapp"),
          }}
          error={errors.whatsapp?.message}
        />
      </fieldset>

      <fieldset className="order-4 col-start-1 flex flex-col items-start gap-11 lg:order-4">
        <legend className="mb-10 text-start text-2xl font-medium">REDES SOCIALES</legend>
        {socialFields.map(({ label, id, placeholder }) => {
          const fieldId = id as keyof FormMusicianProfileSchema;
          return (
            <LabeledInput
              key={id}
              label={label}
              htmlFor={id}
              inputProps={{
                id,
                type: "text",
                placeholder,
                ...register(fieldId),
              }}
              error={errors[fieldId]?.message}
            />
          );
        })}
      </fieldset>

      <div className="order-last col-start-1 flex gap-11">
        <Button type="submit" className="flex-1/2 bg-[#6E6E6E] text-white" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
        <Button type="button" className="flex-1/2 bg-[#B1B1B1] text-white" onClick={onClose}>
          CANCELAR
        </Button>
      </div>

      {openProfileImagenModal && (
        <ProfilePhotoModal
          mode="edit"
          open={true}
          onClose={handleCloseModal}
          openProfileImagen={handleProfileImageChange}
          currentImage={
            profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage
          }
        />
      )}
    </form>
  );
};

export default FormMusicianProfile;
