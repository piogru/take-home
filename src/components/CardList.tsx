import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DeletedListItem, ListItem } from "../api/getListData";
import { Card } from "./Card";

type CardListProps = {
  cards: ListItem[] | DeletedListItem[];
};

export const CardList: FC<CardListProps> = ({ cards }) => {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className="flex flex-col gap-y-3">
      {cards.map((card) => {
        const description =
          "description" in card ? card.description : undefined;

        return (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={description}
          />
        );
      })}
    </div>
  );
};
