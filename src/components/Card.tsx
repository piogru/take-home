import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton, ToggleButton } from "./Buttons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useShallow } from "zustand/shallow";
import { useStore } from "../store";
import { RevertIcon } from "./icons";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
};

export const Card: FC<CardProps> = ({ id, title, description }) => {
  const [parent] = useAutoAnimate();
  const { isExpanded, isDeleted, deleteCard, restoreCard, toggleCard } =
    useStore(
      useShallow((state) => ({
        isExpanded: state.expandedCardIdSet.has(id),
        isDeleted: state.deletedCardIdSet.has(id),
        deleteCard: state.deleteCard,
        restoreCard: state.restoreCard,
        toggleCard: state.toggleCard,
      }))
    );

  const onExpand = () => {
    toggleCard(id);
  };

  const onDelete = () => {
    deleteCard(id);
  };

  const onRestore = () => {
    restoreCard(id);
  };

  return (
    <div ref={parent} className="w-full border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {isDeleted ? (
            <ToggleButton onClick={onRestore}>
              <RevertIcon />
            </ToggleButton>
          ) : (
            <>
              <ExpandButton isExpanded={isExpanded} onClick={onExpand} />
              <DeleteButton onClick={onDelete} />
            </>
          )}
        </div>
      </div>
      {!isDeleted ? (
        <>{isExpanded ? <p className="text-sm">{description}</p> : null}</>
      ) : null}
    </div>
  );
};
