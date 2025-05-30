import { useState, useMemo, PropsWithChildren } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./auth-context";
import { User } from "../types";

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      try {
        return jwtDecode<User>(storedToken);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return null;
      }
    }
    return null;
  });

  const handleLogin = (userToken: string) => {
    localStorage.setItem("userToken", userToken);

    const userData = jwtDecode<User>(userToken);
    setUser(userData);
    return userData;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
  };

  const value = useMemo(() => ({ user, handleLogin, handleLogout }), [user]);

  return <AuthContext value={value}>{children}</AuthContext>;
};
