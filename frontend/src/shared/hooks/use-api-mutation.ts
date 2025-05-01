import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { api } from "../utils/axios-instance";
import { AxiosError } from "axios";

type HttpMethod = "post" | "put" | "patch" | "delete";

export const useApiMutation = <T, V = unknown>(
  endpoint: string,
  method: HttpMethod = "post",
): UseMutationResult<T, Error, V> => {
  const mutationFn = async (body: V): Promise<T> => {
    try {
      const response = await api.request<T>({
        url: endpoint,
        method,
        data: body,
      });

      if (!response.data) {
        throw new Error("No data was received from the API");
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data;

      throw apiError;
    }
  };

  return useMutation({
    mutationFn,
  });
};

//Se usa
// POST a /users
// const createUser = useApiMutation<UserResponse, CreateUserInput>("/users", "post");
// createUser.mutate({ name: "Ana", email: "ana@example.com" });

// // PUT a /users/123
// const updateUser = useApiMutation<UserResponse, UpdateUserInput>("/users/123", "put");
// updateUser.mutate({ email: "newemail@example.com" });

// // DELETE a /users/123 sin body
// const deleteUser = useApiMutation<DeleteResponse, void>("/users/123", "delete");
// deleteUser.mutate();

// Siendo T ==> es lo que devuelve el backend cuando hacés la mutación (lo que recibís)
// Siendo V ==> es lo que le mandás al backend en el body del request (el input, el payload)
