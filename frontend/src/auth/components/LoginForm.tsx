import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { useState } from "react";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { User } from "../types";
import { Spinner } from "@/app/ui/Spinner";
import { EyeOff, EyeOn } from "@/app/ui/Icons";

const LoginSchema = z.object({
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z.string().min(8, { message: "Su contraseña debe tener al menos 8 caracteres" }),
});

type FormFields = z.infer<typeof LoginSchema>;

interface LoginResponse {
  token: string;
}

const demoAccounts = [
  { label: "Fan", email: "alice.johnson@example.com" },
  { label: "Músico", email: "peter.donovan@example.com" },
] as const;

const demoPassword = "Demo123!";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const { mutate, isPending } = useApiMutation<LoginResponse, FormFields>("/auth/login", "POST");

  const handleFormSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    mutate(data, {
      onSuccess: (response) => {
        const user = handleLogin(response.token);
        toast.success(`Bienvenido ${user.name}`);
        handleNavigate(user);
      },
      onError: (error) => {
        setError("root", {
          message: error.message,
        });
      },
    });
  };

  const handleNavigate = ({ role, id }: Pick<User, "role" | "id">) => {
    const route =
      role === "MUSICIAN" ? "/profile/musician/edit?section=overview" : `/profile/fan/${id}`;
    navigate(route);
  };

  const loadDemoCredentials = (email: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", demoPassword, { shouldValidate: true });
    clearErrors();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full max-w-[329px] flex-col gap-4"
    >
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

      <Button type="submit" bgType="primary" disabled={isPending} className="mt-5">
        {isPending ? (
          <>
            Iniciando sesión... <Spinner className="ml-2 size-8 rounded-full bg-white/20" />
          </>
        ) : (
          "Iniciar sesión"
        )}
      </Button>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <section className="mt-2 border-t border-slate-200 pt-4" aria-labelledby="ecos-demo-title">
        <div className="mb-3">
          <p id="ecos-demo-title" className="text-ecos-blue font-semibold">
            Acceso de demostración
          </p>
          <p className="text-sm text-slate-600">
            Elige un rol para recorrer sus funciones. Contraseña: {demoPassword}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => {
                loadDemoCredentials(account.email);
              }}
              className="text-ecos-blue rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-100"
            >
              Usar {account.label}
            </button>
          ))}
        </div>
      </section>
    </form>
  );
};

export default LoginForm;
