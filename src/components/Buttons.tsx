import { ComponentProps, FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = ComponentProps<"button">;
type DeleteButtonProps = { isExpanded: boolean } & ButtonProps;

export const ExpandButton: FC<DeleteButtonProps> = ({
  isExpanded,
  children,
  ...props
}) => {
  return (
    <button
      className={`hover:text-gray-700 transition-[colors,_transform] flex items-center justify-center duration ease-in-out ${
        isExpanded ? "rotate-0" : "rotate-180"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};
