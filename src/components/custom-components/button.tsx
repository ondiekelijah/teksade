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
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  isRounded?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  size = "md", // Default value, change as needed
  className = "",
  variant = "filled", // Default value, change as needed
  title,
  loadingText,
  color = "indigo", // Default value, change as needed
  onClickHandler,
  disabled = false,
  type = "button",
  isLoading = false,
  icon,
  isRounded = true,
}) => {
  const gradientValue = variant === "gradient" ? { from: "indigo", to: "cyan", deg: 45 } : undefined;

  return (
    <>
      {disabled ? (
        <Button className={` ${className} ${isRounded && "rounded-full"}`} variant={variant} size={size} gradient={gradientValue} color={color} onClick={onClickHandler} data-disabled type={type}>
          {title}
        </Button>
      ) : (
        <Button className={` ${className} ${isRounded && "rounded-full"}`} variant={variant} size={size} gradient={gradientValue} color={color} onClick={onClickHandler} type={type} rightIcon={icon}>
          {isLoading ? loadingText : title}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
