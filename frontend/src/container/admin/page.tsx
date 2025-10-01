import AdminHeader from "@/component/admin/header";
import Sidebar from "@/component/admin/sidebar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AdminPage = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  const { pathname } = useLocation();
  const mode =
    pathname
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .slice(1)
      .join("/") || "admins";

  return (
    <>
      <div className="flex flex-row w-full h-full">
        <Sidebar toggleSidebar={toggleSidebar} />
        <div className="w-full flex flex-col items-center px-1 gap-6 bg-white">
          <AdminHeader mode={mode} setToggleSidebar={setToggleSidebar} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
