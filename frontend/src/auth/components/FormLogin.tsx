import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../validation/LoginSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<typeof LoginSchema>;

interface FormLoginProps {
  onSubmit: (data: LoginFormData) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSubmit }) => {
  // const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    onSubmit(data);
  };

  // const handleFormSubmit = (data: LoginFormData) => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     onSubmit(data);
  //     setIsLoading(false);
  //   }, 3000);
  // };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="justyfi-center flex h-[501px] w-[700px] flex-col items-center space-y-4"
    >
      <div className="flex h-[181px] w-[328px] flex-col gap-[20px]">
        <div className="flex flex-col gap-[12px]">
          <input
            type="email"
            {...register("email")}
            placeholder="email@mail.com"
            className="h-[50px] w-full rounded-[27px] border-[1px] bg-[#ECE6F0] px-[12px] font-[roboto] text-[14px]"
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}

          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
            className="h-[50px] w-full rounded-[27px] border-[1px] bg-[#ECE6F0] px-[12px] font-[roboto] text-[14px]"
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[50px] w-full rounded-[27px] border-[1px] bg-[#7F7F7F] font-[roboto] text-[14px]"
        >
          {isSubmitting ? "Cargando..." : "Iniciar sesión"}
        </button>
      </div>

      <a href="#" className="font-[roboto] text-[14px]">
        Olvidé mi contraseña
      </a>
    </form>
  );
};

export default FormLogin;
