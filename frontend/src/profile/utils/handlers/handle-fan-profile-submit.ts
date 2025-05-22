import { FormFanProfileSchema } from "@/profile/components/forms/schemas/ProfileSchema";

interface HandleFanProfileSubmitParams {
  data: FormFanProfileSchema;
  profileImage: File | string | null;
  mutate: (formData: FormData) => void;
}

export const handleFanProfileSubmit = ({
  data,
  profileImage,
  mutate,
}: HandleFanProfileSubmitParams) => {
  const formData = new FormData();
  let deletePhoto = "true";

  formData.append("country", data.country);
  data.genreInterest.forEach((genre) => {
    formData.append("genreInterest", genre);
  });

  if (profileImage) {
    if (profileImage instanceof File) {
      formData.append("photo", profileImage);
    }
    deletePhoto = "false";
  }

  formData.append("deletePhoto", deletePhoto);

  mutate(formData);
};
