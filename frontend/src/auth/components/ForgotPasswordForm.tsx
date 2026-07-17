import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";

interface ForgotPasswordFormProps {
  onChange: () => void;
}
const schema = z.object({ email: z.string().email({ message: "Ingresa un email válido." }) });
type FormFields = z.infer<typeof schema>;
interface ApiMessage {
  message: string;
}

const ForgotPasswordForm = ({ onChange }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const { mutate, isPending, isSuccess } = useApiMutation<ApiMessage, FormFields>(
    "/auth/forgot-password",
    "POST",
  );
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data, {
      onError: (error) => {
        setError("root", { message: error.message });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[329px] flex-col gap-5 text-center"
    >
      <p className="text-sm leading-6 text-slate-600">
        Escribe tu correo y te enviaremos un enlace para crear una nueva contraseña.
      </p>
      <div className="text-left">
        <Input type="email" {...register("email")} placeholder="e-mail@mail.com" />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      {isSuccess && (
        <p className="text-sm leading-6 text-emerald-700">
          Si existe una cuenta con ese correo, recibirás las instrucciones en unos minutos.
        </p>
      )}
      <Button type="submit" bgType="primary" disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar enlace"}
      </Button>
      <button type="button" onClick={onChange} className="text-ecos-blue text-sm underline">
        Volver a iniciar sesión
      </button>
      {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
    </form>
  );
};

export default ForgotPasswordForm;
