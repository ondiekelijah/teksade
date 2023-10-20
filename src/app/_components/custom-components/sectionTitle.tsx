import React from "react";

interface SectionTitleProps {
  heading: string;
  description: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  heading,
  description,
}) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">{heading}</h1>
      <p className={`mt-4 ${true ? "text-slate-400" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
