import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff } from "./ui/EyeOff";
import { EyeOn } from "./ui/EyeOn";
import { useApiMutation } from "../hooks/useApiMutation";
import { useNavigate } from "react-router";
import { useState } from "react";

const registerSchema = z.object({
  name: z.string().min(3, { message: "Su nombre es obligatorio" }),
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos" }),
  }),
});

export type FormFields = z.infer<typeof registerSchema>;

type RegistrationData = Omit<FormFields, "terms"> & { role: string };

interface RegistrationFormProps {
  role: string;
}

const RegistrationForm = ({ role }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useApiMutation<RegistrationData>();
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormFields> = (formData) => {
    const dataToSend: RegistrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role,
    };

    mutate(
      {
        url: "https://ecos-ed30.onrender.com/auth",
        method: "POST",
        data: dataToSend,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            setServerMessage("Registro exitoso 🎉 Redirigiendo...");
          } else {
            setServerMessage(response.message ?? "Registro exitoso.");
            setTimeout(() => {
              void navigate("/profile");
            }, 2000);
          }
        },
        onError: (error) => {
          setServerMessage(error.message);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-[329px] flex-col gap-4">
      <div>
        <Input type="text" placeholder="Nombre" {...register("name")} />
        {errors.name && <p className="mt-1 h-6 text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Input type="email" placeholder="e-mail@mail.com" {...register("email")} />
        {errors.email && <p className="mt-1 h-6 text-red-500">{errors.email.message}</p>}
      </div>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          {...register("password")}
        />
        <button
          type="button"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="absolute top-2 right-4 text-gray-500"
        >
          {showPassword ? <EyeOn /> : <EyeOff />}
          <span className="sr-only">
            {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          </span>
        </button>
      </div>

      <label className="flex items-center justify-center gap-2 text-sm">
        <input type="checkbox" {...register("terms")} className="size-6" />
        <span className="checkbox-label text-[#6E6E6E]">
          Leí y acepto los <u className="hover:cursor-pointer">Términos de uso</u>.
        </span>
      </label>
      {errors.terms && <p className="mt-1 h-6 text-red-500">{errors.terms.message}</p>}
      {serverMessage && (
        <p className={`mt-2 ${isPending ? "text-blue-500" : "text-green-500"}`}>{serverMessage}</p>
      )}

      <Button className="hover:cursor-pointer" type="submit" disabled={isPending}>
        {isPending ? "Registrándose..." : "Registrate"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
