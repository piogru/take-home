import { useQueryClient } from "@tanstack/react-query";
import { useGetListData } from "../api/getListData";

export const RefreshButton = () => {
  const queryClient = useQueryClient();
  const { isFetching } = useGetListData();

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["list"] });
  };

  return (
    <button
      className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
      onClick={onRefresh}
    >
      {isFetching ? "Refreshing..." : "Refresh"}
    </button>
  );
};
