import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
};

const base =
  "inline-flex items-center justify-center h-8 min-w-8 px-2 rounded-md border text-sm transition";
const normal =
  "border-main/30 text-main bg-white hover:bg-main/5 active:bg-main/10";
const disabledClass = "opacity-40 pointer-events-none";

const NavButton = ({ direction, disabled, onClick, ariaLabel }: Props) => (
  <button
    className={`${base} ${normal} ${disabled ? disabledClass : ""}`}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
  >
    {direction === "prev" ? (
      <ChevronLeft className="w-4 h-4" />
    ) : (
      <ChevronRight className="w-4 h-4" />
    )}
  </button>
);

export default NavButton;
