import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/app/ui/Spinner";
import { EyeOff, EyeOn } from "@/app/ui/Icons";

const nameRegex = /^[\p{L}0-9\s]+$/u;
const noOnlySpaces = /^(?!\s*$).+/;
const passwordRegex = /^[a-zA-Z0-9!@#$%&*_-]+$/;

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Su nombre debe tener al menos 3 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(nameRegex, { message: "Su nombre solo puede contener letras, números y espacios." }),
  email: z.string().email({ message: "El email ingresado no es válido." }),
  password: z
    .string()
    .min(8, { message: "Su contraseña debe tener al menos 8 caracteres." })
    .regex(noOnlySpaces, { message: "Este campo no puede contener solo espacios." })
    .regex(passwordRegex, {
      message: "La contraseña solo puede contener letras, números y ! @ # $ % & * _ -",
    }),
  terms: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos." }) }),
});

export type FormFields = z.infer<typeof registerSchema>;
type RegistrationData = Omit<FormFields, "terms"> & { role: string };
interface ApiMessage {
  message: string;
}

interface RegistrationFormProps {
  role: string;
}

const RegistrationForm = ({ role }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(registerSchema) });
  const { mutate, isPending } = useApiMutation<ApiMessage, RegistrationData>("/auth", "POST");
  const { mutate: resendVerification, isPending: isResending } = useApiMutation<
    ApiMessage,
    { email: string }
  >("/auth/resend-verification", "POST");

  const onSubmit: SubmitHandler<FormFields> = ({ name, email, password }) => {
    mutate(
      { name, email, password, role },
      {
        onSuccess: (response) => {
          setRegisteredEmail(email);
          reset();
          toast.success(response.message);
        },
        onError: (error) => {
          setError("root", { message: error.message });
        },
      },
    );
  };

  if (registeredEmail) {
    return (
      <div className="text-ecos-blue flex w-full max-w-[360px] flex-col items-center gap-5 text-center">
        <p className="text-lg font-bold">Revisa tu correo</p>
        <p className="text-sm leading-6">
          Enviamos un enlace de verificación a <strong>{registeredEmail}</strong>. Debes confirmarlo
          antes de iniciar sesión.
        </p>
        <Button
          type="button"
          bgType="secondary"
          disabled={isResending}
          onClick={() => {
            resendVerification(
              { email: registeredEmail },
              {
                onSuccess: (response) => toast.success(response.message),
                onError: (error) => toast.error(error.message),
              },
            );
          }}
          className="w-full"
        >
          {isResending ? "Reenviando..." : "Reenviar correo"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-[329px] flex-col gap-5">
      <div>
        <Input
          type="text"
          placeholder="Nombre y apellido"
          className="text-ecos-blue"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Input type="email" placeholder="e-mail@mail.com" {...register("email")} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
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
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <label className="flex items-center justify-start gap-2 text-sm">
        <input type="checkbox" {...register("terms")} className="m-2.5 size-6" />
        <span className="checkbox-label text-ecos-blue">
          He leído y acepto los <u className="hover:cursor-pointer">Términos de uso</u>
        </span>
      </label>
      {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}
      <Button type="submit" bgType="primary" disabled={isPending} className="mt-2">
        {isPending ? (
          <>
            Registrándose... <Spinner className="ml-2 size-8 rounded-full bg-white/20" />
          </>
        ) : (
          "Regístrate"
        )}
      </Button>
      {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
    </form>
  );
};

export default RegistrationForm;
