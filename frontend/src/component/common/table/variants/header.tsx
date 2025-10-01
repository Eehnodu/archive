import type { ReactNode } from "react";
import { alignCls, cellBase } from "../utils";

export type Align = "left" | "center" | "right";

export type TableColumn = {
  header: ReactNode;
  width?: string;
  align?: Align;
  className?: string;
  id?: string;
};

type Props = {
  columns: TableColumn[];
  template: string;
};

const Header = ({ columns, template }: Props) => (
  <div
    className="grid bg-sub2 text-sm font-medium text-main border-b border-main/10"
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
);

export default Header;
