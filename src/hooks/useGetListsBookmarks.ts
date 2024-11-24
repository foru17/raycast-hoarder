import { useCachedPromise } from "@raycast/utils";
import { fetchGetSingleListBookmarks } from "../apis";

export function useGetListsBookmarks(listId: string) {
  const { isLoading, data, error, revalidate } = useCachedPromise(
    async () => {
      const result = await fetchGetSingleListBookmarks(listId);
      return result?.bookmarks || [];
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
