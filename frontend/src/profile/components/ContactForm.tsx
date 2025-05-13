import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(3, { message: "Tu nombre no puede tener menos de 3 caracteres" }),
  email: z.string().email({ message: "El email ingresado no es válido" }),
  message: z.string().max(300, { message: "Tu mensaje como máximo puede tener 300 caracteres" }),
});

type FormFields = z.infer<typeof ContactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    console.log(data);

    // TODO: enviar un email al usuario con los datos del formulario y manejar errores con el setError
  };

  return (
    <form className="flex max-w-[810px] flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
          id="email"
          type="text"
          placeholder="Escribí tu email"
          className="border border-gray-300 p-3 text-sm"
          {...register("email")}
        />
        {errors.email && (
          <span className="mt-1 h-6 text-sm text-red-500">{errors.email.message}</span>
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

      <button type="submit" className="cursor-pointer rounded-full bg-gray-400 py-2.5 text-white">
        Enviar
      </button>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
};

export default ContactForm;
