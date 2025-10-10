import type { FC } from "react";
import Header from "./variants/header";
import Group from "./variants/group";
import Row from "./variants/row";
import Subrow from "./variants/subrow";
import type { MenuItem, SidebarProps } from "./types";

const renderMenu = (items: MenuItem[], variant: "admin" | "client") =>
  items.map((item) =>
    item.children && item.children.length > 0 ? (
      <Group key={item.to} title={item.label} variant={variant}>
        {item.children.map((child) =>
          child.children && child.children.length > 0 ? (
            <Group key={child.to} title={child.label} variant={variant}>
              {child.children.map((gchild) => (
                <Subrow
                  key={gchild.to}
                  to={gchild.to}
                  label={gchild.label}
                  variant={variant}
                />
              ))}
            </Group>
          ) : (
            <Row
              key={child.to}
              to={child.to}
              label={child.label}
              variant={variant}
            />
          )
        )}
      </Group>
    ) : (
      <Row key={item.to} to={item.to} label={item.label} variant={variant} />
    )
  );

const Sidebar: FC<SidebarProps> = ({
  toggle,
  title,
  logoSrc,
  menu,
  className,
  variant = "admin", // 기본값: admin
}) => {
  const shell =
    variant === "admin"
      ? "h-full bg-sub2 text-main rounded-2xl shadow-lg flex flex-col border border-main/10"
      : "h-full bg-white text-main rounded-2xl shadow-md flex flex-col border border-main/10";

  const bodyPad =
    variant === "admin"
      ? "px-4 py-8 flex flex-col gap-6"
      : "px-3 py-4 flex flex-col gap-3";

  return (
    <aside
      className={[
        "h-full transition-all duration-300 ease-in-out",
        "flex-shrink-0 overflow-hidden",
        toggle ? "w-56" : "w-0",
        className ?? "",
      ].join(" ")}
    >
      <div className={shell}>
        <Header title={title} logoSrc={logoSrc} variant={variant} />
        <div className={[bodyPad, "min-w-0"].join(" ")}>{renderMenu(menu, variant)}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
