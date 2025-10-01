// --- file: datePicker.tsx ---
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

/** Utils */
const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d?: Date | null) =>
  d ? `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}` : "";
const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const clampTime = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const isSameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && +startOfDay(a) === +startOfDay(b);
const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

const getMonthMatrix = (anchor: Date) => {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const start = new Date(first);
  const weekday = start.getDay(); // 0..6 (Sun..Sat)
  start.setDate(first.getDate() - weekday); // start from Sunday cell
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

/** Types */
export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  availableDates?: Date[];
};

/** Component */
export const DateRangePicker = ({
  value,
  onChange,
  placeholder = "yyyy.mm.dd ~ yyyy.mm.dd",
  minDate,
  maxDate,
  availableDates,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(() => value?.start ?? new Date());
  const [tempRange, setTempRange] = useState<DateRange>(() => ({
    start: value?.start ?? null,
    end: value?.end ?? null,
  }));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 닫기
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // 열릴 때 tempRange 최신화
  useEffect(() => {
    if (open)
      setTempRange({ start: value?.start ?? null, end: value?.end ?? null });
  }, [open, value?.start, value?.end]);

  const cells = useMemo(() => getMonthMatrix(month), [month]);

  const displayText =
    tempRange.start && tempRange.end
      ? `${fmt(tempRange.start)} ~ ${fmt(tempRange.end)}`
      : value?.start && value?.end
        ? `${fmt(value.start)} ~ ${fmt(value.end)}`
        : "";

  const panelText = useMemo(() => {
    if (tempRange.start && tempRange.end)
      return `${fmt(tempRange.start)} ~ ${fmt(tempRange.end)}`;
    if (tempRange.start && hoverDate) {
      const a =
        +clampTime(tempRange.start) <= +clampTime(hoverDate)
          ? `${fmt(tempRange.start)} ~ ${fmt(hoverDate)}`
          : `${fmt(hoverDate)} ~ ${fmt(tempRange.start)}`;
      return a;
    }
    if (value?.start && value?.end)
      return `${fmt(value.start)} ~ ${fmt(value.end)}`;
    return "";
  }, [tempRange.start, tempRange.end, hoverDate, value?.start, value?.end]);

  const isDisabled = useCallback(
    (d: Date) => {
      const t = +clampTime(d);
      if (minDate && t < +clampTime(minDate)) return true;
      if (maxDate && t > +clampTime(maxDate)) return true;
      if (availableDates && availableDates.length > 0) {
        const has = availableDates.some((ad) => +clampTime(ad) === t);
        if (!has) return true;
      }
      return false;
    },
    [minDate, maxDate, availableDates]
  );

  const inPreviewRange = useCallback(
    (d: Date) => {
      const s = tempRange.start;
      const e = tempRange.end ?? hoverDate;
      if (!s || !e) return false;
      const a = +clampTime(s);
      const b = +clampTime(e);
      const x = +clampTime(d);
      return x >= Math.min(a, b) && x <= Math.max(a, b);
    },
    [tempRange.start, tempRange.end, hoverDate]
  );

  const handleSelect = useCallback(
    (d: Date) => {
      if (isDisabled(d)) return;

      // 시작점이 없거나 이미 완성된 상태면 시작 다시 선택
      if (!tempRange.start || (tempRange.start && tempRange.end)) {
        setTempRange({ start: d, end: null });
        setHoverDate(null);
        setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
        return;
      }
      // 끝점 선택
      if (tempRange.start && !tempRange.end) {
        if (+d < +tempRange.start) {
          setTempRange({ start: d, end: tempRange.start });
        } else {
          setTempRange({ start: tempRange.start, end: d });
        }
      }
    },
    [isDisabled, tempRange.start, tempRange.end]
  );

  const confirm = useCallback(() => {
    if (tempRange.start && tempRange.end) {
      onChange?.({ ...tempRange });
      setOpen(false);
    }
  }, [tempRange.start, tempRange.end, onChange]);

  const reset = useCallback(() => {
    setTempRange({ start: null, end: null });
    onChange?.({ start: null, end: null });
    setOpen(false);
  }, [onChange]);

  const headerLabel = `${month.getFullYear()}년 ${month.getMonth() + 1}월`;

  return (
    <div className="relative" ref={rootRef}>
      <div className="relative">
        <CalendarIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          readOnly
          role="combobox"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
          value={displayText}
          placeholder={placeholder}
          className="h-10 w-full pl-9 pr-8 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 cursor-pointer"
        />
        {/* 입력값 지우기(선택값 있을 때) */}
        {(value?.start && value?.end) || (tempRange.start && tempRange.end) ? (
          <button
            type="button"
            aria-label="기간 초기화"
            title="초기화"
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      {open && (
        <div
          role="dialog"
          aria-label="기간 설정"
          className="absolute right-full top-0 mr-2 z-50 w-[320px] rounded-xl border border-gray-200 bg-white shadow-xl p-3"
        >
          {/* Close Button / 제목 */}
          <div className="flex justify-between px-1">
            <span className="text-sm font-medium text-gray-800">기간 설정</span>
            <button
              type="button"
              aria-label="달력 닫기"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 선택 표시 */}
          <div className="px-1 pt-1 pb-0.5 text-xs text-gray-600 text-center">
            {panelText || placeholder}
          </div>

          {/* Month Header */}
          <div className="flex items-center justify-between px-1 py-1.5">
            <button
              type="button"
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setMonth((m) => addMonths(m, -1))}
              aria-label="이전 달"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-sm font-medium text-gray-800">
              {headerLabel}
            </div>

            <button
              type="button"
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setMonth((m) => addMonths(m, 1))}
              aria-label="다음 달"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-[11px] text-gray-500 px-1">
            {"일월화수목금토".split("").map((w) => (
              <div key={w} className="h-6 flex items-center justify-center">
                {w}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 p-1">
            {cells.map((d) => {
              const isOtherMonth = d.getMonth() !== month.getMonth();
              const selectedStart = isSameDay(d, tempRange.start);
              const selectedEnd = isSameDay(d, tempRange.end);
              const inRange = inPreviewRange(d);

              const isSingle = selectedStart && selectedEnd;
              const roundedClass = isSingle
                ? "rounded-md"
                : selectedStart
                  ? "rounded-l-md"
                  : selectedEnd
                    ? "rounded-r-md"
                    : "rounded-none";

              const bgClass =
                selectedStart || selectedEnd
                  ? "bg-gray-900 text-white"
                  : inRange
                    ? "bg-gray-300"
                    : "";

              return (
                <button
                  key={+d}
                  type="button"
                  onMouseEnter={() => setHoverDate(d)}
                  onFocus={() => setHoverDate(d)}
                  onMouseLeave={() => setHoverDate(null)}
                  onBlur={() => setHoverDate(null)}
                  onClick={() => handleSelect(d)}
                  disabled={isDisabled(d)}
                  className={[
                    "relative h-9 text-sm transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300",
                    isOtherMonth ? "text-gray-300" : "text-gray-700",
                    roundedClass,
                    bgClass,
                    isDisabled(d) ? "opacity-40 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={reset}
                className="h-8 px-3 rounded-md text-sm border border-gray-300 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={!tempRange.start || !tempRange.end}
                className="h-8 px-3 text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed bg-gray-900 hover:bg-gray-800 rounded-md"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DateUtils = { fmt };
