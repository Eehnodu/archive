export const pad = (n: number) => String(n).padStart(2, "0");
export const fmt = (d?: Date | null) =>
  d ? `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}` : "";
export const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const clampTime = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const isSameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && +startOfDay(a) === +startOfDay(b);
export const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

export const getMonthMatrix = (anchor: Date) => {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const start = new Date(first);
  const weekday = start.getDay();
  start.setDate(first.getDate() - weekday);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

export type DateRange = {
  start: Date | null;
  end: Date | null;
};
