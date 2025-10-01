import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type Intent = "primary" | "secondary";
export type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: Intent;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  full?: boolean;
  className?: string;
};

export const sizeMap: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors " +
  "focus:outline-none disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "md",
      leftIcon,
      rightIcon,
      full,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(base, sizeMap[size], full && "w-full", className);

    return (
      <button ref={ref} className={classes} disabled={disabled} {...rest}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children && <span className="truncate">{children}</span>}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
