import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-200 hover:bg-gray-300 text-black py-2 px-4",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
