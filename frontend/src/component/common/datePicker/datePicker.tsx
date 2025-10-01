import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  addMonths,
  clampTime,
  getMonthMatrix,
  isSameDay,
  type DateRange,
} from "./utils";
import Input from "./variants/input";
import CalendarHeader from "./variants/calendarHeader";
import Weekdays from "./variants/weekdays";
import DayCell from "./variants/dayCell";
import Footer from "./variants/footer";

export type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  availableDates?: Date[];
};

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

  // open 시 tempRange 최신화
  useEffect(() => {
    if (open)
      setTempRange({ start: value?.start ?? null, end: value?.end ?? null });
  }, [open, value?.start, value?.end]);

  const cells = useMemo(() => getMonthMatrix(month), [month]);

  // 인풋에 표시할 텍스트 (유지)
  const displayText =
    (tempRange.start &&
      tempRange.end &&
      `${format(tempRange.start)} ~ ${format(tempRange.end)}`) ||
    (value?.start &&
      value?.end &&
      `${format(value.start)} ~ ${format(value.end)}`) ||
    "";

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

      if (!tempRange.start || (tempRange.start && tempRange.end)) {
        setTempRange({ start: d, end: null });
        setHoverDate(null);
        setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
        return;
      }
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
      <Input
        open={open}
        placeholder={placeholder}
        displayText={displayText}
        hasValue={Boolean(
          (value?.start && value?.end) || (tempRange.start && tempRange.end)
        )}
        onToggle={() => setOpen((v) => !v)}
        onReset={(e) => {
          e.stopPropagation();
          reset();
        }}
      />

      {open && (
        <div
          role="dialog"
          aria-label="기간 설정"
          className="absolute right-full top-0 mr-2 z-50 w-[320px] rounded-xl border border-main/20 bg-sub2 shadow-xl p-3"
        >
          <CalendarHeader
            label={headerLabel}
            onPrev={() => setMonth((m) => addMonths(m, -1))}
            onNext={() => setMonth((m) => addMonths(m, 1))}
          />

          <Weekdays />

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
                  ? "bg-main text-white"
                  : inRange
                    ? "bg-main/15"
                    : "";

              return (
                <DayCell
                  key={+d}
                  date={d}
                  isOtherMonth={isOtherMonth}
                  disabled={isDisabled(d)}
                  roundedClass={roundedClass}
                  bgClass={bgClass}
                  onMouseEnter={() => setHoverDate(d)}
                  onFocus={() => setHoverDate(d)}
                  onMouseLeave={() => setHoverDate(null)}
                  onBlur={() => setHoverDate(null)}
                  onClick={() => handleSelect(d)}
                />
              );
            })}
          </div>

          <Footer
            onCancel={reset}
            onConfirm={confirm}
            confirmDisabled={!tempRange.start || !tempRange.end}
          />
        </div>
      )}
    </div>
  );
};

// 로컬 util: 표시용 포맷
const format = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
