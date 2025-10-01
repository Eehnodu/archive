import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "solid" | "outlined" | "transparent" | "transparented";
type Intent = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  intent?: Intent;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  full?: boolean;
};

/** 공통 클래스 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors " +
  "focus:outline-none disabled:cursor-not-allowed";

/** 사이즈 매핑 */
const sizeMap: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

/** variant → intent 스타일 */
const variantMap = {
  solid: {
    primary:
      "bg-gray-500 text-white hover:bg-black active:bg-black/90 " +
      "disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 " +
      "disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200",
  },
  outlined: {
    primary:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-300 " +
      "disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200",
    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 " +
      "disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200",
  },
  transparent: {
    primary:
      "text-gray-900 hover:bg-gray-100 " +
      "disabled:text-gray-400 disabled:hover:bg-transparent",
    secondary:
      "text-gray-600 hover:bg-gray-100 " +
      "disabled:text-gray-400 disabled:hover:bg-transparent",
  },
} as const;

/** 'transparented' → 'transparent' 매핑 */
const normalizeVariant = (v: Variant): keyof typeof variantMap =>
  v === "transparented" ? "transparent" : v;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "solid",
      intent = "primary",
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
    const v = normalizeVariant(variant);
    const classes = clsx(
      base,
      sizeMap[size],
      variantMap[v][intent],
      full && "w-full",
      className
    );

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
