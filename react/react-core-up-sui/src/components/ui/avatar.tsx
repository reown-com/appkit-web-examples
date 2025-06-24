import React from "react";

interface AvatarProps {
  className?: string;
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ className = "", children }) => {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
};

export const AvatarImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = "" }) => {
  return (
    <img
      className={`aspect-square h-full w-full ${className}`}
      src={src}
      alt={alt}
    />
  );
};

export const AvatarFallback: React.FC<AvatarProps> = ({
  className = "",
  children,
}) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
    >
      {children}
    </div>
  );
};
