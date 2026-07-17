import Button from "@/app/ui/Button";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

interface ApiMessage {
  message: string;
}

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { mutate, isPending, isSuccess, error } = useApiMutation<ApiMessage, { token: string }>(
    "/auth/verify-email",
    "POST",
  );

  useEffect(() => {
    if (token) mutate({ token });
  }, [mutate, token]);

  const message = !token
    ? "El enlace de verificación no es válido."
    : isPending
      ? "Estamos verificando tu correo..."
      : isSuccess
        ? "Tu correo fue verificado. Ya puedes iniciar sesión."
        : (error?.message ?? "No fue posible verificar este enlace.");

  return (
    <main className="mx-auto flex w-full max-w-screen-xl items-center px-4 py-14 sm:px-8 md:py-20">
      <section className="w-full max-w-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
          Cuenta Ecos
        </p>
        <h1 className="font-nunito text-ecos-blue mt-2 text-3xl font-bold">
          Verificación de correo
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">{message}</p>
        {!isPending && (
          <Button type="button" bgType="primary" className="mt-7 px-6">
            <Link to="/">Ir al inicio</Link>
          </Button>
        )}
      </section>
    </main>
  );
}
