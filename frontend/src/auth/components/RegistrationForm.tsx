import Button from "@/shared/Button";
import Input from "@/shared/Input";

const RegistrationForm = () => {
  return (
    <form className="w-full">
      <div className="mb-9 flex flex-col gap-4">
        <Input type="text" placeholder="Nombre" />
        <Input type="email" placeholder="e-mail@mail.com" />
        <Input type="password" placeholder="Contraseña" />
      </div>
      <Button type="submit">Registrarse</Button>
    </form>
  );
};

export default RegistrationForm;
