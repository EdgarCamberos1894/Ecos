import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { api } from "../utils/axios-instance";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export const useApiMutation = <T, V = unknown>(
  url: string,
  method: HttpMethod = "POST",
  config?: AxiosRequestConfig<V>,
): UseMutationResult<T, Error, V> => {
  const mutationFn = async (data: V): Promise<T> => {
    try {
      const response = await api.request<T>({
        url,
        method,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data;
      console.log(apiError);

      throw apiError;
    }
  };

  return useMutation({
    mutationFn,
  });
};
