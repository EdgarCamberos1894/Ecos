import { FormMusicianProfileSchema } from "../../components/forms/shemas/ProfileSchema";

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

  console.log(data);

  formData.append("stageName", data.stageName);
  formData.append("country", data.country);
  formData.append("genre", data.genre);

  if (profileImage) {
    if (profileImage instanceof File) {
      formData.append("photo", profileImage);
    }
    deletePhoto = "false";
  }

  formData.append("deletePhoto", deletePhoto);

  if (data.paymentLink) {
    formData.append("paymentLink", data.paymentLink);
  }

  if (data.paymentAlias) {
    formData.append("paymentAlias", data.paymentAlias);
  }

  if (data.cbu) {
    formData.append("cbu", data.cbu);
  }

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
