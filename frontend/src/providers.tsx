import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth/context/AuthProvider";

const queryClient = new QueryClient();

type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster richColors />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};
