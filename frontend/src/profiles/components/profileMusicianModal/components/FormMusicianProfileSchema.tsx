import { z } from "zod";

const createSocialUrlRegex = (domain: string) =>
  new RegExp(`^https?:(www\\.)?${domain.replace(".", "\\.")}`, "i");

const nameRegex = /^[a-zA-Z0-9\s]+$/;
const noOnlySpaces = /^(?!\s*$).+/;
const whatsappRegex = /^\+?\d{7,15}$/;
const tiktokUrlRegex = createSocialUrlRegex("tiktok.com");
const instagramUrlRegex = createSocialUrlRegex("instagram.com");
const youtubeUrlRegex = createSocialUrlRegex("youtube.com");
const spotifyUrlRegex = createSocialUrlRegex("spotify.com");

export const formMusicianProfileSchema = z.object({
  stageName: z
    .string()
    .min(3, { message: "Su nombre debe tener al menos 3 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(nameRegex, {
      message: "Su nombre solo puede contener letras, números y espacios.",
    }),
  email: z.string().email({ message: "El email ingresado no es válido." }),
  country: z.string().min(1, { message: "El país es obligatorio." }),
  genre: z.string().min(1, { message: "El género es obligatorio." }),
  photoUrl: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || /\.(jpg|jpeg|png|gif)$/i.test(val), {
      message: "La imagen debe ser JPG, PNG o GIF",
    }),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || whatsappRegex.test(val), {
      message: "El número de Whatsapp es inválido.",
    }),
  spotifyUrl: z
    .string()
    .optional()
    .refine((val) => !val || spotifyUrlRegex.test(val), {
      message: "La URL de Spotify no es válida.",
    }),
  youtubeUrl: z
    .string()
    .optional()
    .refine((val) => !val || youtubeUrlRegex.test(val), {
      message: "La URL de YouTube no es válida.",
    }),
  instagramUrl: z
    .string()
    .optional()
    .refine((val) => !val || instagramUrlRegex.test(val), {
      message: "La URL de Instagram no es válida.",
    }),
  tiktokUrl: z
    .string()
    .optional()
    .refine((val) => !val || tiktokUrlRegex.test(val), {
      message: "La URL de Tik Tok no es válida.",
    }),
});

export type FormMusicianProfileSchema = z.infer<typeof formMusicianProfileSchema>;
