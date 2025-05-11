import { FormMusicianProfileSchema } from "@/profiles/components/profileMusicianModal/components/FormMusicianProfileSchema";

interface HandleMusicianProfileSubmitParams {
  data: FormMusicianProfileSchema;
  profileImage: File | string | null;
  mutate: (formData: FormData) => void;
}

export const handleMusicianProfileSubmit = ({
  data,
  profileImage,
  mutate,
}: HandleMusicianProfileSubmitParams) => {
  const formData = new FormData();
  let deletePhoto = "true";

  formData.append("stageName", data.stageName);
  formData.append("country", data.country);
  formData.append("genre", data.genre);

  if (profileImage instanceof File || typeof profileImage === "string") {
    formData.append("photo", profileImage);
    deletePhoto = "false";
  }

  formData.append("deletePhoto", deletePhoto);

  if (data.whatsapp) {
    formData.append("whatsapp", data.whatsapp);
  }
  if (data.spotifyUrl) {
    formData.append("spotifyUrl", data.spotifyUrl);
  }
  if (data.youtubeUrl) {
    formData.append("youtubeUrl", data.youtubeUrl);
  }
  if (data.instagramUrl) {
    formData.append("instagramUrl", data.instagramUrl);
  }
  if (data.tiktokUrl) {
    formData.append("tiktokUrl", data.tiktokUrl);
  }

  mutate(formData);
};
