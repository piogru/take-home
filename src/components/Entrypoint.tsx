import { useEffect, useState } from "react";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { useShallow } from "zustand/shallow";
import { useStore } from "../store";
import { Spinner } from "./Spinner";
import { RefreshButton } from "./Refresh";
import { ToggleButton } from "./Buttons";
import { CardList } from "./CardList";

/*
  1. React-query is an async state manager, therefore I have decided to only save changes made by the user
  in the Zustand store.
  2. I have decided to disable refetchOnFocus due to randomized and shuffled data being returned from `useGetListData`.
  3. I am assuming that "refresh" refers to a refetch since it is supposed to be implemented with react-query.
  4. I am assuming that a card with 'isVisible: false' should not be shown in the deleted column

  Testing:
    I would primarily focus on integration tests of <EntryPoint /> component, in order to replicate regular
    component as closely as possible and ensure that features provided by Zustand and React-query work correctly.
    Mocks without randomized data might be necessary for proper testing.
    In the case of <EntryPoint /> tests would include:
      - Checking the number of elements rendered within the list and list length in the header,
      - Clicking 'Refresh' and verifying if state is persisted properly,
      - Checking if number of deleted cards is correct before revealing and if reveal causes proper number
      of cards to be rendered,
      - Checking if delete causes the correct card to be moved from one list to another,
*/

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<DeletedListItem[]>([]);
  const [revealDeletedCards, setRevealDeletedCards] = useState(false);
  const listQuery = useGetListData();
  const { deletedCardIdSet } = useStore(
    useShallow((state) => ({
      deletedCardIdSet: state.deletedCardIdSet,
    }))
  );

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    if (listQuery.data) {
      const { visibleCards, deletedCards } = listQuery.data.reduce<{
        visibleCards: ListItem[];
        deletedCards: DeletedListItem[];
      }>(
        (ctx, item) => {
          if (item.isVisible) {
            if (deletedCardIdSet.has(item.id)) {
              ctx.deletedCards.push(item as DeletedListItem);
            } else {
              ctx.visibleCards.push(item);
            }
          }
          return ctx;
        },
        { visibleCards: [], deletedCards: [] }
      );

      setVisibleCards(visibleCards);
      setDeletedCards(deletedCards);
      return;
    }

    setVisibleCards([]);
    setDeletedCards([]);
  }, [listQuery.data, listQuery.isLoading, deletedCardIdSet]);

  const onRevealToggle = () => {
    setRevealDeletedCards((prevState) => !prevState);
  };

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16 w-full max-w-[76rem]">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <RefreshButton />
        </div>
        <CardList cards={visibleCards} />
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <ToggleButton onClick={onRevealToggle}>
            {revealDeletedCards ? "Hide" : "Reveal"}
          </ToggleButton>
        </div>
        {revealDeletedCards ? <CardList cards={deletedCards} /> : null}
      </div>
    </div>
  );
};
