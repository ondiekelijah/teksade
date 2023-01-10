import React from "react";
import clsx from "clsx";

export interface ChipProps {
  label: string;
  className?: string;
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  className,
  active,
  ...rest
}) => {
  return (
    <span
      className={clsx(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-400 py-1.5 px-3 text-sm capitalize transition-colors duration-500 ease-in-out hover:dark:text-indigo-700",
        className,
        [
          active
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "hover:bg-slate-200",
        ]
      )}
      {...rest}
    >
      {label}
    </span>
  );
};
