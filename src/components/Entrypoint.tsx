import { useEffect, useState } from "react";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { useShallow } from "zustand/shallow";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card } from "./Card";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const [parent] = useAutoAnimate();
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<DeletedListItem[]>([]);
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
      console.log(visibleCards, deletedCards);

      setVisibleCards(visibleCards);
      setDeletedCards(deletedCards);
      return;
    }

    setVisibleCards([]);
    setDeletedCards([]);
  }, [listQuery.data, listQuery.isLoading, deletedCardIdSet]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-72 max-w-xl bg-blue-500/50">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
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
      <div className="w-72 max-w-xl bg-slate-400">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <button
            disabled
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Reveal
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {deletedCards.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
};
