// container/admin/layout/AdminShell.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminHeader } from "@/component/admin/header";
import { Sidebar } from "@/component/common/sidebar";
import logo from "@/assets/logo.png";

const adminMenu = [{ label: "아카이브 관리", to: "/admin/archive" }];

const AdminShell = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { pathname } = useLocation();
  const mode =
    pathname
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .slice(1)
      .join("/") || "admins";

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar
        toggle={toggleSidebar}
        title="Archive"
        logoSrc={logo}
        menu={adminMenu}
        variant="admin"
      />
      <div className="w-full flex flex-col items-center px-1 gap-6 bg-white">
        <AdminHeader mode={mode} setToggleSidebar={setToggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminShell;
