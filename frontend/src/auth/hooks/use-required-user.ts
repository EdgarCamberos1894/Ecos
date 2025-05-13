import { useAuth } from "./use-auth";

export function useRequiredUser() {
  const { user } = useAuth();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return user;
}
