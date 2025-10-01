import { Calendar as CalendarIcon, X } from "lucide-react";

type Props = {
  open: boolean;
  placeholder: string;
  displayText: string;
  hasValue: boolean;
  onToggle: () => void;
  onReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Input = ({
  open,
  placeholder,
  displayText,
  hasValue,
  onToggle,
  onReset,
}: Props) => (
  <div className="relative">
    <CalendarIcon className="w-4 h-4 text-main absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    <input
      readOnly
      role="combobox"
      aria-expanded={open}
      aria-haspopup="dialog"
      onClick={onToggle}
      value={displayText}
      placeholder={placeholder}
      className="h-10 w-full pl-9 pr-8 border border-main/30 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-main cursor-pointer"
    />
    {hasValue && (
      <button
        type="button"
        aria-label="기간 초기화"
        title="초기화"
        onClick={onReset}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-sub1/10 text-sub1"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default Input;
