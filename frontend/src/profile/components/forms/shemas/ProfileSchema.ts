import { z } from "zod";

const nameRegex = /^[a-zA-Z0-9\s]+$/;
const noOnlySpaces = /^(?!\s*$).+/;
const aliasRegex = /^[a-zA-Z0-9.-]+$/;
const accountNumberRegex = /^[A-Z0-9]+$/;
const whatsappRegex = /^\+?\d{7,15}$/;
const createSocialUrlRegex = (domain: string) =>
  new RegExp(`^https?:\\/\\/(www\\.)?${domain.replace(".", "\\.")}`, "i");

export const baseProfileSchema = z.object({
  email: z.string().email({ message: "El email ingresado no es válido." }),
  country: z.string().min(1, { message: "El país es obligatorio." }),
  photoUrl: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || /\.(jpg|jpeg|png|gif)$/i.test(val), {
      message: "La imagen debe ser JPG, PNG o GIF",
    }),
});

export const formMusicianProfileSchema = baseProfileSchema.extend({
  stageName: z
    .string()
    .min(3, { message: "Su nombre debe tener al menos 3 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(nameRegex, {
      message: "Su nombre solo puede contener letras, números y espacios.",
    }),
  genre: z.string().min(1, { message: "El género es obligatorio." }),
  paymentLink: z.string().url({ message: "Debe ser un enlace válido" }).or(z.literal("")),
  paymentAlias: z
    .string()
    .regex(aliasRegex, {
      message: "El alias solo puede contener letras, números, puntos y guiones",
    })
    .refine((val) => val.length === 0 || (val.length >= 6 && val.length <= 20), {
      message: "El alias debe tener entre 6 y 20 caracteres",
    })
    .or(z.literal("")),
  cbu: z
    .string()
    .regex(accountNumberRegex, {
      message: "Solo se permiten letras mayúsculas y números (ej. IBAN)",
    })
    .refine((val) => val.length === 0 || (val.length >= 8 && val.length <= 34), {
      message: "El número de cuenta debe tener entre 8 y 34 caracteres",
    })
    .or(z.literal("")),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || whatsappRegex.test(val), {
      message: "El número de Whatsapp es inválido.",
    }),
  spotifyUrl: z
    .string()
    .optional()
    .refine((val) => !val || createSocialUrlRegex("spotify.com").test(val), {
      message: "La URL de Spotify no es válida.",
    }),
  youtubeUrl: z
    .string()
    .optional()
    .refine((val) => !val || createSocialUrlRegex("youtube.com").test(val), {
      message: "La URL de YouTube no es válida.",
    }),
  instagramUrl: z
    .string()
    .optional()
    .refine((val) => !val || createSocialUrlRegex("instagram.com").test(val), {
      message: "La URL de Instagram no es válida.",
    }),
  tiktokUrl: z
    .string()
    .optional()
    .refine((val) => !val || createSocialUrlRegex("tiktok.com").test(val), {
      message: "La URL de Tik Tok no es válida.",
    }),
});

export type FormMusicianProfileSchema = z.infer<typeof formMusicianProfileSchema>;

export const formFanProfileSchema = baseProfileSchema.extend({
  name: z
    .string()
    .min(3, { message: "Su nombre debe tener al menos 3 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(nameRegex, {
      message: "Su nombre solo puede contener letras, números y espacios.",
    }),
  genreInterest: z
    .array(z.string().min(1))
    .nonempty({ message: "Debe seleccionar al menos un género musical." }),
});

export type FormFanProfileSchema = z.infer<typeof formFanProfileSchema>;
