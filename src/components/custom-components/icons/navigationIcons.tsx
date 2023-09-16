import { useMantineColorScheme } from "@mantine/core";
import React from "react";

interface ChevronIconProps {
  direction: "next" | "prev";
  className?: string;
  style?: React.CSSProperties;
  hideCircle?: boolean;
  size?: number;
}

const DEFAULT_SIZE = 35;

const ChevronIcon: React.FC<ChevronIconProps> = ({ direction, className, style, hideCircle, size = DEFAULT_SIZE }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const pathD = direction === "next" 
    ? "M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
    : "M13.293 6.293L7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z";

  const circleColor = dark ? "#4d4f66" : "gray";

  return (
    <span className={`inline-flex cursor-pointer items-center align-middle text-[#5c7cfa]`} aria-label={direction === "next" ? "Next" : "Previous"}>
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
        {!hideCircle && <circle cx="12" cy="12" r="11" stroke={circleColor} fill="none" />}
        <path d={pathD}></path>
      </svg>
    </span>
  );
};

const NextIcon: React.FC<Omit<ChevronIconProps, "direction">> = props => <ChevronIcon direction="next" {...props} />;
const PrevIcon: React.FC<Omit<ChevronIconProps, "direction">> = props => <ChevronIcon direction="prev" {...props} />;

export { NextIcon, PrevIcon };
