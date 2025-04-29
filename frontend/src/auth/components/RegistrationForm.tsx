import Button from "@/shared/Button";
import Input from "@/shared/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(3, { message: "Su nombre es obligatorio" }),
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
});

export type FormFields = z.infer<typeof registerSchema>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (formData: FormFields) => {
    console.log("Datos validados --> ", formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)(e);
      }}
      className="w-full"
    >
      <div className="mb-9 flex flex-col gap-4">
        <div>
          <Input type="text" placeholder="Nombre" {...register("name")} />{" "}
          {errors.name && <p className="mt-1 h-6 text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Input type="email" placeholder="e-mail@mail.com" {...register("email")} />{" "}
          {errors.email && <p className="mt-1 h-6 text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Contraseña" {...register("password")} />{" "}
          {errors.password && <p className="mt-1 h-6 text-red-500">{errors.password.message}</p>}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrándose..." : "Registrarse"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
