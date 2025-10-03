import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  variant: "admin" | "client";
};

const Group = ({ title, children, variant }: Props) => {
  const titleCls =
    variant === "admin"
      ? "px-4 pb-2 text-center text-main font-semibold text-lg border-b border-main/20"
      : "px-3 pb-2 text-left text-main/90 font-medium text-sm border-b border-main/10";

  return (
    <div className="w-full pb-3 min-w-0">
      {title && <div className={[titleCls, "whitespace-nowrap truncate"].join(" ")}>{title}</div>}
      <div className="mt-2 flex flex-col min-w-0">{children}</div>
    </div>
  );
};

export default Group;
