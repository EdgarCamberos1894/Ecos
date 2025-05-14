import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useApiQuery } from "@/shared/hooks/use-api-query";

export const useProfileForm = <T extends object>(
  queryKey: string,
  id: string,
  endpoint: string,
  formContext: UseFormReturn<T>,
): { data: T | undefined; isLoading: boolean; isError: boolean } => {
  const { data, isLoading, isError } = useApiQuery<{ data: T }>(queryKey, endpoint, id);

  const { reset } = formContext;

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  useEffect(() => {
    if (isError) {
      console.error("Error en la API:", isError);
    }
  }, [isError]);

  return { data: data?.data, isLoading, isError };
};
