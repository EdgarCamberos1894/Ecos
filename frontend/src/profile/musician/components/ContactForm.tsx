import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(3, { message: "Tu nombre debe tener al menos 3 caracteres" }),
  senderEmail: z.string().email({ message: "Ingresa un email valido" }),
  message: z.string().max(300, { message: "Tu mensaje puede tener hasta 300 caracteres" }),
});

type FormFields = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  musicianId: number;
}
interface Body {
  subject: string;
  message: string;
  senderEmail: string;
  musicianId: number;
}
interface ContactResponse {
  message: string;
}

const fieldClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-ecos-blue placeholder:text-slate-400 transition-colors focus:border-ecos-orange focus:outline-none focus:ring-3 focus:ring-orange-100";

const ContactForm = ({ musicianId }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(ContactSchema) });
  const { mutate, isPending } = useApiMutation<ContactResponse, Body>(
    "musician-profile/contact",
    "POST",
  );

  const onSubmit: SubmitHandler<FormFields> = ({ message, name, senderEmail }) => {
    mutate(
      { subject: `Ecos - ${name}`, message, senderEmail, musicianId },
      {
        onSuccess: (response) => toast.success(response.message),
        onError: (error) => {
          toast.error("No se pudo enviar el mensaje");
          setError("root", { message: error.message });
        },
      },
    );
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-ecos-blue space-y-2 text-sm font-bold" htmlFor="name">
          Nombre
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className={fieldClassName}
            {...register("name")}
          />
          {errors.name && (
            <span className="block text-xs font-normal text-red-600">{errors.name.message}</span>
          )}
        </label>
        <label className="text-ecos-blue space-y-2 text-sm font-bold" htmlFor="senderEmail">
          Email
          <input
            id="senderEmail"
            type="email"
            placeholder="tu@email.com"
            className={fieldClassName}
            {...register("senderEmail")}
          />
          {errors.senderEmail && (
            <span className="block text-xs font-normal text-red-600">
              {errors.senderEmail.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-ecos-blue space-y-2 text-sm font-bold" htmlFor="message">
        Mensaje
        <textarea
          id="message"
          placeholder="Cuentale por que quieres contactarlo"
          className={`${fieldClassName} min-h-36 resize-y`}
          rows={6}
          {...register("message")}
        />
        {errors.message && (
          <span className="block text-xs font-normal text-red-600">{errors.message.message}</span>
        )}
      </label>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-slate-500">El artista recibira tu mensaje por correo.</p>
        <button
          type="submit"
          disabled={isPending}
          className="button-primary px-6 py-3 text-sm font-bold"
        >
          {isPending ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
      {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}
    </form>
  );
};

export default ContactForm;
