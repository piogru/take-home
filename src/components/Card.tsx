import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
};

export const Card: FC<CardProps> = ({ title, description }) => {
  const [parent] = useAutoAnimate();
  const [isExpanded, setIsExpanded] = useState(false);

  const onExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div ref={parent} className="w-72 border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton isExpanded={isExpanded} onClick={onExpand}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton />
        </div>
      </div>
      {isExpanded ? <p className="text-sm">{description}</p> : null}
    </div>
  );
};
