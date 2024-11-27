import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useShallow } from "zustand/shallow";
import { useStore } from "../store";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
};

export const Card: FC<CardProps> = ({ id, title, description }) => {
  const [parent] = useAutoAnimate();
  const { isExpanded, deleteCard, toggleCard } = useStore(
    useShallow((state) => ({
      isExpanded: state.expandedCardIdSet.has(id),
      deleteCard: state.deleteCard,
      toggleCard: state.toggleCard,
    }))
  );

  const onExpand = () => {
    toggleCard(id);
  };

  const onDelete = () => {
    deleteCard(id);
  };

  return (
    <div ref={parent} className="w-72 border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton isExpanded={isExpanded} onClick={onExpand} />
          <DeleteButton onClick={onDelete} />
        </div>
      </div>
      {description ? (
        <>{isExpanded ? <p className="text-sm">{description}</p> : null}</>
      ) : null}
    </div>
  );
};
