import { useMantineTheme } from "@mantine/core";
import React from "react";

interface SectionTitleProps {
  heading: string;
  description: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ heading, description }) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">{heading}</h1>
      <p className={`mt-4 ${dark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
    </div>
  );
};

export default SectionTitle;
