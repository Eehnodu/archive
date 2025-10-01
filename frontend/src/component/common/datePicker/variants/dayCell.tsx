type Props = {
  date: Date;
  isOtherMonth: boolean;
  disabled: boolean;
  roundedClass: string;
  bgClass: string;
  onMouseEnter: () => void;
  onFocus: () => void;
  onMouseLeave: () => void;
  onBlur: () => void;
  onClick: () => void;
};

const DayCell = ({
  date,
  isOtherMonth,
  disabled,
  roundedClass,
  bgClass,
  onMouseEnter,
  onFocus,
  onMouseLeave,
  onBlur,
  onClick,
}: Props) => (
  <button
    type="button"
    onMouseEnter={onMouseEnter}
    onFocus={onFocus}
    onMouseLeave={onMouseLeave}
    onBlur={onBlur}
    onClick={onClick}
    disabled={disabled}
    className={[
      "relative h-9 text-sm transition-colors",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-main/30",
      isOtherMonth ? "text-black/30" : "text-black/70",
      roundedClass,
      bgClass,
      disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-main/10",
    ].join(" ")}
  >
    {date.getDate()}
  </button>
);

export default DayCell;
