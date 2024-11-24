import { useCachedPromise } from "@raycast/utils";
import { fetchGetAllBookmarks } from "../apis";

export function useGetAllBookmarks() {
  const { isLoading, data, error, revalidate } = useCachedPromise(
    async () => {
      const result = await fetchGetAllBookmarks();
      return result.bookmarks || [];
    },
    [],
    {
      execute: true,
    },
  );

  return {
    isLoading,
    bookmarks: data || [],
    error,
    revalidate,
  };
}
