import { useQueryClient } from "@tanstack/react-query";
import { useGetListData } from "../api/getListData";
import { ToggleButton } from "./Buttons";

export const RefreshButton = () => {
  const queryClient = useQueryClient();
  const { isFetching } = useGetListData();

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["list"] });
  };

  return (
    <ToggleButton onClick={onRefresh}>
      {isFetching ? "Refreshing..." : "Refresh"}
    </ToggleButton>
  );
};
