"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#191919] disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-[#363636] text-white hover:bg-[#4a4a4a] focus-visible:ring-[#363636]",
      secondary:
        "bg-[#1f1f1f] text-white hover:bg-[#2a2a2a] focus-visible:ring-[#1f1f1f]",
      outline:
        "border border-[#3f3f3f] bg-transparent text-white hover:bg-[#313131] focus-visible:ring-[#3f3f3f]",
      ghost:
        "bg-transparent text-[#edededa8] hover:bg-[#2a2a2a] hover:text-white focus-visible:ring-[#2a2a2a]",
      danger:
        "bg-red-600/90 text-white hover:bg-red-600 focus-visible:ring-red-600",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
