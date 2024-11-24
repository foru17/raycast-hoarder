import { useCachedPromise } from "@raycast/utils";
import { fetchGetSingleTagBookmarks } from "../apis";

export function useGetTagsBookmarks(tagId: string) {
  const { isLoading, data, error, revalidate } = useCachedPromise(
    async () => {
      const result = await fetchGetSingleTagBookmarks(tagId);
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
