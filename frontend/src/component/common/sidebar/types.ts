import type { ReactNode } from "react";

export type Variant = "admin" | "client";

export type MenuItem = {
  label: string;
  to: string;
  icon?: ReactNode;
  children?: MenuItem[];
  roles?: string[]; // 필요 시 사용
};

export type SidebarProps = {
  toggle: boolean; // 펼침/접힘
  title?: string;
  logoSrc?: string;
  menu: MenuItem[];
  className?: string;
  variant?: Variant;
};
