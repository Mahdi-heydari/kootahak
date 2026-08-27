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
      "inline-flex items-center justify-center font-weight-token-medium transition-all duration-token-normal ease-token-default rounded-token-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-primary",
      secondary:
        "bg-muted text-primary hover:bg-border-hover focus-visible:ring-border",
      outline:
        "border border-border bg-transparent text-primary hover:bg-muted focus-visible:ring-border",
      ghost:
        "bg-transparent text-muted-foreground hover:bg-muted hover:text-primary focus-visible:ring-border",
      danger: "bg-error text-white hover:opacity-90 focus-visible:ring-error",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-token-xs",
      md: "h-10 px-4 text-token-sm",
      lg: "h-12 px-6 text-token-base",
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
