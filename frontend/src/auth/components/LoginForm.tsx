import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

const LoginSchema = z.object({
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Datos enviados:", data);
  };

  return (
    <div className="flex h-full flex-col items-center justify-around">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
        <div className="mb-9 flex flex-col gap-4">
          <div className="flex flex-col gap-[12px]">
            <Input type="email" {...register("email")} placeholder="email@mail.com" />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}

            <Input type="password" {...register("password")} placeholder="Contraseña" />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </div>

        <a href="#" className="font-[roboto] text-[14px]">
          Olvidé mi contraseña
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
