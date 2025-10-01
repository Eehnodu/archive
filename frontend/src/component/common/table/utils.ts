import type { ReactNode } from "react";

export type Align = "left" | "center" | "right";

export const alignCls = (a?: Align) =>
  a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";

export const isEmptyNode = (n: ReactNode) =>
  n === null || n === undefined || (typeof n === "string" && n.trim() === "");

export const cellBase = "py-2 whitespace-nowrap overflow-hidden text-ellipsis";
