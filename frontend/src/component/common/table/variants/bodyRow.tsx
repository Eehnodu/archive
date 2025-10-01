import React from "react";
import type { ReactNode, CSSProperties } from "react";
import { alignCls, cellBase } from "../utils";
import type { TableColumn } from "./header";

type Props = {
  rowIndex: number;
  cells: ReactNode[];
  columns: TableColumn[];
  template: string;
  isFiller: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

const BodyRow = React.forwardRef<HTMLDivElement, Props>(
  (
    { rowIndex, cells, columns, template, isFiller, className, style, onClick },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`grid text-sm border-t border-main/10 items-center hover:bg-main/5 transition-colors ${className ?? ""}`}
        style={{ gridTemplateColumns: template, ...style }}
        role="row"
        onClick={onClick}
        aria-rowindex={rowIndex + 1}
        aria-disabled={isFiller || undefined}
      >
        {cells.map((node, cIdx) => (
          <div
            key={`c-${rowIndex}-${cIdx}`}
            className={`${cellBase} ${alignCls(columns[cIdx]?.align)} ${columns[cIdx]?.className ?? ""}`}
            role="cell"
          >
            {node}
          </div>
        ))}
      </div>
    );
  }
);

BodyRow.displayName = "BodyRow";
export default BodyRow;
