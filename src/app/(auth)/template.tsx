import React from "react";

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return <div className="flex justify-center h-screen p-6">{children}</div>;
};

export default Template;
