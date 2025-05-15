import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth/context/AuthProvider";
import ScrollToTop from "./shared/ui/ScrollToTop";

const queryClient = new QueryClient();

type ProvidersProps = PropsWithChildren;

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              success:
                "p-4 bg-ecos-orange-light border border-ecos-base text-ecos-blue rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,.1)] text-[13px] flex items-center gap-1.5",
              info: "p-4 bg-ecos-blue border border-ecos-base text-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,.1)] text-[13px] flex items-center gap-1.5",
              error:
                "p-4 bg-ecos-blue border border-ecos-base text-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,.1)] text-[13px] flex items-center gap-1.5",
            },
          }}
        />
        <ScrollToTop />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};
