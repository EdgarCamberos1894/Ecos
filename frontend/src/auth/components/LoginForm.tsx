import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { EyeOff } from "./ui/EyeOff";

const LoginSchema = z.object({
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleFormSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    console.log("Datos enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div>
        <Input type="email" {...register("email")} placeholder="e-mail@mail.com" />
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>

      <div className="relative flex items-center">
        <Input type="password" placeholder="Contraseña" {...register("password")} />{" "}
        <EyeOff className="absolute right-6" />
        {errors.password && <p className="mt-1 h-6 text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
