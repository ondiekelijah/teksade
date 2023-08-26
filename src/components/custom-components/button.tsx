import React from "react";
import { Button } from "@mantine/core";

interface ButtonProps {
  size?: string;
  className?: string;
  variant?: string;
  title?: string;
  color?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  size = "md", // Default value, change as needed
  className = "",
  variant = "default", // Default value, change as needed
  title,
  color = "indigo", // Default value, change as needed
}) => {

  const gradientValue = variant === "gradient" ? { from: "indigo", to: "cyan", deg: 45 } : undefined;

  return (
    <Button
      className={`rounded-full ${className}`}
      variant={variant}
      size={size}
      gradient={gradientValue}
        color={color}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
