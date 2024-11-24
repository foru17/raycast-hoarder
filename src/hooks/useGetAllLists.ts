import { useCachedPromise } from "@raycast/utils";
import { fetchGetAllLists, fetchGetSingleList } from "../apis";

export function useGetAllLists() {
  const {
    isLoading,
    data: lists,
    error,
    revalidate,
  } = useCachedPromise(async () => {
    const result = await fetchGetAllLists();
    const lists = result.lists || [];

    // add count to each list
    const listsWithCount = await Promise.all(
      lists.map(async (list) => {
        const details = await fetchGetSingleList(list.id);
        return {
          ...list,
          count: details.bookmarks?.length || 0,
        };
      }),
    );

    return listsWithCount;
  }, []);

  return {
    isLoading,
    lists: lists || [],
    error,
    revalidate,
  };
}
