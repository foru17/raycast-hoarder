import { useCachedPromise } from "@raycast/utils";
import { fetchGetAllTags } from "../apis";

export function useGetAllTags() {
  const { isLoading, data, error, revalidate } = useCachedPromise(
    async () => {
      const result = await fetchGetAllTags();
      return result.tags || [];
    },
    [],
    {
      execute: true,
    },
  );

  return {
    isLoading,
    tags: data || [],
    error,
    revalidate,
  };
}
