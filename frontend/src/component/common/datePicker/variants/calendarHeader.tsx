import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
};

const CalendarHeader = ({ label, onPrev, onNext }: Props) => (
  <div className="flex items-center justify-between px-1 py-1.5">
    <button
      type="button"
      className="p-1 rounded-md hover:bg-main/10"
      onClick={onPrev}
      aria-label="이전 달"
    >
      <ChevronLeft className="w-4 h-4 text-main" />
    </button>
    <div className="text-sm font-medium text-main">{label}</div>
    <button
      type="button"
      className="p-1 rounded-md hover:bg-main/10"
      onClick={onNext}
      aria-label="다음 달"
    >
      <ChevronRight className="w-4 h-4 text-main" />
    </button>
  </div>
);

export default CalendarHeader;
