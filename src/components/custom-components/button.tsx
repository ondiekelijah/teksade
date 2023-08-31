import React from "react";
import { Button } from "@mantine/core";
import { type } from "os";

interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: string;
  title?: string;
  color?: string;
  onClickHandler?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ButtonProps> = ({
  size = "md", // Default value, change as needed
  className = "",
  variant = "default", // Default value, change as needed
  title,
  color = "indigo", // Default value, change as needed
  onClickHandler,
  disabled = false,
  type = "button",
}) => {
  const gradientValue = variant === "gradient" ? { from: "indigo", to: "cyan", deg: 45 } : undefined;

  return (
    <>
      {disabled ? (
        <Button 
          className={`rounded-full ${className}`} 
          variant={variant} 
          size={size} 
          gradient={gradientValue} 
          color={color} 
          onClick={onClickHandler}
          data-disabled
          type={type}
        >
          {title}
        </Button>
      ) : (
        <Button 
          className={`rounded-full ${className}`} 
          variant={variant} 
          size={size} 
          gradient={gradientValue} 
          color={color} 
          onClick={onClickHandler}
          type={type}
        >
          {title}
        </Button>
      )}
    </>
  );
  
};

export default CustomButton;
