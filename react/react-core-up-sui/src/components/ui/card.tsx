import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({
  className = "",
  children,
}) => {
  return <div className={`${className}`}>{children}</div>;
};
