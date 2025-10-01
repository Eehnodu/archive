import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import TitleBar from "./variants/titleBar";
import Header, { type TableColumn } from "./variants/header";
import BodyRow from "./variants/bodyRow";
import Empty from "./variants/empty";
import { alignCls, isEmptyNode } from "./utils";

type Align = "left" | "center" | "right";

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
  right?: ReactNode; // 타이틀 바 오른쪽 커스텀 영역 (옵션)
};

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
  right,
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

  // 첫 번째 데이터 행 height 자동 측정 → 모든 행에 적용
  const firstDataRef = useRef<HTMLDivElement | null>(null);
  const [autoRowH, setAutoRowH] = useState<number>(44); // fallback
  const firstDataIdx = rows.findIndex((r) => !r.isFiller);

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

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div
        className="rounded-2xl border border-main/10 overflow-hidden"
        style={{ minWidth }}
        role="table"
      >
        <TitleBar
          title={title}
          total={total}
          totalCount={total_count}
          right={right}
        />

        {/* Header */}
        <Header columns={columns} template={template} />

        {/* Body */}
        {showEmpty ? (
          <Empty emptyText={emptyText} />
        ) : (
          rows.map((row, rIdx) => {
            const isProbe = rIdx === firstDataIdx; // 높이 측정 대상
            const composedRowClass =
              typeof rowClassName === "function"
                ? rowClassName(rIdx, row.isFiller)
                : (rowClassName ?? "");

            return (
              <BodyRow
                key={rIdx}
                ref={isProbe ? firstDataRef : null}
                rowIndex={rIdx}
                cells={row.cells}
                columns={columns}
                template={template}
                isFiller={row.isFiller}
                className={composedRowClass}
                style={{ height: `${autoRowH}px` }}
                onClick={
                  onRowClick && !row.isFiller
                    ? () => onRowClick(rIdx)
                    : undefined
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Table;
export type { TableColumn, Align };
