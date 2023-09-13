import React from "react";
import { Button } from "@mantine/core";

interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: string;
  title?: string | React.ReactNode | number;
  color?: string;
  onClickHandler?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  isRounded?: boolean;
  isWithArrow?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  size = "md", // Default value, change as needed
  className = "",
  variant = "filled", // Default value, change as needed
  title,
  color = "indigo", // Default value, change as needed
  onClickHandler,
  disabled = false,
  type = "button",
  icon,
  isRounded = true,
  isWithArrow = false,
}) => {
  const gradientValue = variant === "gradient" ? { from: "indigo", to: "cyan", deg: 45 } : undefined;

  return (
    <>
      {disabled ? (
        <Button className={` ${className} ${isRounded && "rounded-full"}`} variant={variant} size={size} gradient={gradientValue} color={color} onClick={onClickHandler} data-disabled type={type}>
          {title}
        </Button>
      ) : (
        <Button className={` ${className} ${isRounded && "rounded-full align-middle tracking-wide"}`} variant={variant} size={size} gradient={gradientValue} color={color} onClick={onClickHandler} type={type} rightIcon={icon}>
          {title}
          {isWithArrow && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-4"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          )}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
