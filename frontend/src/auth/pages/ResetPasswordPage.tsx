import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { z } from "zod";
import { EyeOff, EyeOn } from "@/app/ui/Icons";

const schema = z
  .object({
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });
type FormFields = z.infer<typeof schema>;
interface ApiMessage {
  message: string;
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const { mutate, isPending, isSuccess } = useApiMutation<
    ApiMessage,
    { token: string; password: string }
  >("/auth/reset-password", "POST");

  const onSubmit = ({ password }: FormFields) => {
    if (!token) {
      setError("root", { message: "El enlace para restablecer la contraseña no es válido." });
      return;
    }
    mutate(
      { token, password },
      {
        onError: (error) => {
          setError("root", { message: error.message });
        },
      },
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-screen-xl items-center px-4 py-14 sm:px-8 md:py-20">
      <section className="w-full max-w-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
          Cuenta Ecos
        </p>
        <h1 className="font-nunito text-ecos-blue mt-2 text-3xl font-bold">
          Crea una nueva contraseña
        </h1>
        {isSuccess ? (
          <div className="mt-5 space-y-5">
            <p className="leading-7 text-emerald-700">
              Tu contraseña fue actualizada. Ya puedes iniciar sesión.
            </p>
            <Link className="button-primary inline-flex h-12 items-center px-5 text-sm" to="/">
              Ir al inicio
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex max-w-sm flex-col gap-5">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
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
                <span className="sr-only">Mostrar u ocultar contraseña</span>
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Repite la contraseña"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" bgType="primary" disabled={isPending}>
              {isPending ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
