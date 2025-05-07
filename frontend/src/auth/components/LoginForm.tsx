import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { EyeOff } from "./ui/EyeOff";
import { EyeOn } from "./ui/EyeOn";
import { useState } from "react";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LoginSchema = z.object({
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
});

type FormFields = z.infer<typeof LoginSchema>;

interface LoginResponse {
  token: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const { mutate, isPending } = useApiMutation<LoginResponse, FormFields>("/auth/login", "POST");

  const handleFormSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    console.log("Datos enviados:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("Login exitoso:", response.token);
        const user = handleLogin(response.token);
        toast.success(`Bienvenido ${user.name}`);
        navigate("/");
      },
      onError: (error) => {
        console.log("Login fallido:", error);
        setError("root", {
          message: error.message,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex w-[329px] flex-col gap-4">
      <div>
        <Input type="email" {...register("email")} placeholder="e-mail@mail.com" />
        {errors.email && (
          <span className="mt-1 h-6 text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
            onKeyDown={(e) => {
              if (e.code === "Space") {
                e.preventDefault();
              }
            }}
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
        {errors.password && (
          <p className="mt-1 h-6 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
};

export default LoginForm;
