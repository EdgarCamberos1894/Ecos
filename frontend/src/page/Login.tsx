import FormLogin from "@/auth/components/FormLogin";
import { z } from "zod";
import { LoginSchema } from "@/auth/validation/LoginSchema";
import axios from "axios";

type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await axios.post("/api/login", data);
      console.log("Respuesta:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <FormLogin onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
