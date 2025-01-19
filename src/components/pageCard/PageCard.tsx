import React from "react";

type PageCardProps = {
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
};

export default function PageCard({
  children,
  width,
}: PageCardProps): React.ReactElement {
  const widthClass =
    width === "lg"
      ? "md:w-10/12"
      : width === "md"
      ? "md:w-8/12"
      : "md:w-6/12 max-w-2xl";

  return (
    <main
      className={`flex flex-1 flex-col p-6 md:my-4 md:self-center gap-6 ${widthClass}`}>
      {children}
    </main>
  );
}
