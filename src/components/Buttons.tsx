import { ComponentProps, FC } from "react";
import { ChevronDownIcon, XMarkIcon } from "./icons";

type ButtonProps = ComponentProps<"button">;
type ExpandButtonProps = { isExpanded: boolean } & ButtonProps;

export const IconButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-6 hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <IconButton {...props}>
      <XMarkIcon />
    </IconButton>
  );
};

export const ExpandButton: FC<Omit<ExpandButtonProps, "children">> = ({
  isExpanded,
  ...props
}) => {
  return (
    <IconButton {...props}>
      <span className="sr-only">{isExpanded ? "Collapse" : "Expand"}</span>
      <div
        className={`transition duration-300 ease-in-out ${
          isExpanded ? "rotate-180" : "rotate-0"
        }`}
      >
        <ChevronDownIcon />
      </div>
    </IconButton>
  );
};

export const ToggleButton: FC<ButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={`text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
