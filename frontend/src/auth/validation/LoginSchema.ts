import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Email inválido" }),
  password: z.string().min(8, "Minimo 8 caracteres"),
});
