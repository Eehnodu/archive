import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Align = "left" | "center" | "right";

export type TableColumn = {
  header: ReactNode;
  width?: string;
  align?: Align;
  className?: string;
  id?: string;
};

type Props = {
  columns: TableColumn[];
  cells: ReactNode[][];
  minWidth?: string;
  emptyText?: string;
  className?: string;
  rowClassName?: string | ((rowIndex: number, isFiller: boolean) => string);
  onRowClick?: (rowIndex: number) => void;
  rowCount?: number;
  total?: number;
  title?: string;
  total_count?: boolean;
};

const alignCls = (a?: Align) =>
  a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";

const isEmptyNode = (n: ReactNode) =>
  n === null || n === undefined || (typeof n === "string" && n.trim() === "");

const Table = ({
  columns,
  cells,
  minWidth = "960px",
  emptyText = "데이터가 없습니다.",
  className = "",
  rowClassName,
  onRowClick,
  rowCount,
  total,
  title,
  total_count = true,
}: Props) => {
  const template = useMemo(
    () => columns.map((c) => c.width ?? "1fr").join(" "),
    [columns]
  );

  const noDataByCells = useMemo(
    () =>
      cells.length === 0 ||
      cells.every((r) => r.length === 0 || r.every((c) => isEmptyNode(c))),
    [cells]
  );

  const showEmpty = useMemo(
    () =>
      typeof total === "number"
        ? total === 0
        : typeof rowCount !== "number" && noDataByCells,
    [total, rowCount, noDataByCells]
  );

  // 목표 행 수
  const target =
    typeof rowCount === "number" ? Math.max(0, rowCount) : cells.length;

  // rows = [{ cells, isFiller }]
  const placeholder = <span className="select-none">&nbsp;</span>;
  const rows = useMemo(() => {
    if (showEmpty) return [] as { cells: ReactNode[]; isFiller: boolean }[];

    const out: { cells: ReactNode[]; isFiller: boolean }[] = [];
    const take = Math.min(cells.length, target);

    for (let i = 0; i < take; i++) {
      const row = cells[i] ?? [];
      out.push({
        cells: columns.map((_, cIdx) => row[cIdx] ?? placeholder),
        isFiller: false,
      });
    }
    for (let i = 0; i < Math.max(0, target - take); i++) {
      out.push({
        cells: columns.map(() => placeholder),
        isFiller: true,
      });
    }
    return out;
  }, [showEmpty, cells, target, columns]);

  const cellBase = "py-2 whitespace-nowrap overflow-hidden text-ellipsis";
  const headerCls = "grid bg-gray-100 text-sm font-medium text-gray-700";

  // 첫 번째 데이터 행 높이 자동 측정 → 모든 행 height로 사용
  const firstDataRef = useRef<HTMLDivElement | null>(null);
  const [autoRowH, setAutoRowH] = useState<number>(44); // fallback

  useEffect(() => {
    if (showEmpty) return;
    const node = firstDataRef.current;
    if (!node) return;

    const measure = () => {
      const h = Math.ceil(node.getBoundingClientRect().height);
      if (h > 0) setAutoRowH(h);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [rows, template, showEmpty]);

  const firstDataIdx = rows.findIndex((r) => !r.isFiller);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div
        className="rounded-2xl border border-gray-200 overflow-hidden"
        style={{ minWidth }}
        role="table"
      >
        {title && (
          <div className="px-4 py-2 border-b border-gray-200 bg-white flex items-center justify-between">
            <h3 className="pl-3 text-lg font-medium text-gray-900">{title}</h3>
            {typeof total === "number" && total_count && (
              <span className="pr-3 text-sm text-gray-600">
                총{" "}
                <span className="text-gray-900 font-bold">
                  {total.toLocaleString()}
                </span>
                건
              </span>
            )}
          </div>
        )}

        {/* Header */}
        <div
          className={headerCls}
          style={{ gridTemplateColumns: template }}
          role="row"
        >
          {columns.map((c, i) => (
            <div
              key={c.id ?? i}
              className={`${cellBase} ${alignCls(c.align)} ${c.className ?? ""}`}
              role="columnheader"
            >
              {c.header}
            </div>
          ))}
        </div>

        {/* Body */}
        {showEmpty ? (
          <div className="py-8 text-center text-gray-500 text-sm">
            {emptyText}
          </div>
        ) : (
          rows.map((row, rIdx) => {
            const isProbe = rIdx === firstDataIdx; // 높이 측정 대상
            return (
              <div
                key={rIdx}
                ref={isProbe ? firstDataRef : null}
                className={`grid text-sm border-t border-gray-200 items-center hover:bg-gray-50/40 ${
                  typeof rowClassName === "function"
                    ? rowClassName(rIdx, row.isFiller)
                    : (rowClassName ?? "")
                }`}
                style={{
                  gridTemplateColumns: template,
                  height: `${autoRowH}px`, // 모든 행 동일 높이 유지
                }}
                role="row"
                onClick={
                  onRowClick && !row.isFiller
                    ? () => onRowClick(rIdx)
                    : undefined
                }
              >
                {row.cells.map((node, cIdx) => (
                  <div
                    key={`c-${rIdx}-${cIdx}`}
                    className={`${cellBase} ${alignCls(columns[cIdx]?.align)} ${columns[cIdx]?.className ?? ""}`}
                    role="cell"
                  >
                    {node}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Table;
