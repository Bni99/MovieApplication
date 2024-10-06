import React from "react";

type ButtonVariants = "primary";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariants;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
}) => {
  const baseStyles =
    "px-4 py-1 font-semibold rounded transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
