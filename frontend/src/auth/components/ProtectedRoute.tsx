import { useAuth } from "../hooks/use-auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
