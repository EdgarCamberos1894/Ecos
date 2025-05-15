import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(3, { message: "Tu nombre no puede tener menos de 3 caracteres" }),
  senderEmail: z.string().email({ message: "El email ingresado no es válido" }),
  message: z.string().max(300, { message: "Tu mensaje como máximo puede tener 300 caracteres" }),
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

const ContactForm = ({ musicianId }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ContactSchema),
  });

  const { mutate, isPending } = useApiMutation<ContactResponse, Body>(
    "musician-profile/contact",
    "POST",
  );

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    const { message, name, senderEmail } = data;

    const body = {
      subject: `Ecos - ${name}`,
      message,
      senderEmail,
      musicianId,
    };

    mutate(body, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error("Error al enviar correo");
        setError("root", {
          message: error.message,
        });
      },
    });
  };

  return (
    <form
      className="text-ecos-blue flex max-w-[810px] flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex flex-col gap-2 text-2xl font-normal" htmlFor="name">
        Nombre
        <input
          id="name"
          type="text"
          placeholder="Escribí tu nombre"
          className="border border-gray-300 p-3 text-sm"
          {...register("name")}
        />
        {errors.name && (
          <span className="mt-1 h-6 text-sm text-red-500">{errors.name.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-2xl font-normal" htmlFor="email">
        Email
        <input
          id="senderEmail"
          type="text"
          placeholder="Escribí tu email"
          className="border border-gray-300 p-3 text-sm"
          {...register("senderEmail")}
        />
        {errors.senderEmail && (
          <span className="mt-1 h-6 text-sm text-red-500">{errors.senderEmail.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-2xl font-normal" htmlFor="message">
        Mensaje
        <textarea
          id="message"
          placeholder="Escribí tu mensaje"
          className="border border-gray-300 p-3 text-sm"
          rows={9}
          {...register("message")}
        />
        {errors.message && (
          <span className="mt-1 h-6 text-sm text-red-500">{errors.message.message}</span>
        )}
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="bg-ecos-blue cursor-pointer rounded-full py-2.5 text-white"
      >
        {isPending ? "Enviando" : "Enviar"}
      </button>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
};

export default ContactForm;
