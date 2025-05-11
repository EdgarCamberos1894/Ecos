import { useApiQuery } from "@/shared/hooks/use-api-query";

export const useProfileData = <T>(queryKey: string, id: string, endpoint: string) => {
  const { data, isLoading, isError, refetch } = useApiQuery<{ data: T }>(queryKey, endpoint, id);

  return { data: data?.data, isLoading, isError, refetch };
};
