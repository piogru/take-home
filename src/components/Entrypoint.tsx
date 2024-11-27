import { useEffect, useState } from "react";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { useShallow } from "zustand/shallow";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { RefreshButton } from "./Refresh";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const [parent] = useAutoAnimate();
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
              ctx.deletedCards.push(item);
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
        <div ref={parent} className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
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
        {revealDeletedCards ? (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <Card key={card.id} id={card.id} title={card.title} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
