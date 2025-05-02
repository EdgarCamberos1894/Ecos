import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiAxios } from "@/shared/components/apiAxios";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiMutationParams<T> {
  url: string;
  method: HttpMethod;
  data?: T;
}

interface ApiMutationResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export function useApiMutation<T>() {
  return useMutation<ApiMutationResult<T>, AxiosError, ApiMutationParams<T>>({
    mutationFn: async ({ url, method, data }: ApiMutationParams<T>) => {
      try {
        const response: AxiosResponse<ApiMutationResult<T>> = await apiAxios.request({
          url,
          method,
          data,
        });

        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(axiosError.response?.data.message ?? "Error en la petición");
      }
    },
  });
}
