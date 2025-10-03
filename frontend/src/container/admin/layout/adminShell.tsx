// container/admin/layout/AdminShell.tsx
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminHeader } from "@/component/admin/header";
import { Sidebar } from "@/component/common/sidebar";
import logo from "@/assets/logo.png";
import MobileMenuPanel from "@/component/admin/header/variants/mobileMenuPanel";

const adminMenu = [{ label: "아카이브 관리", to: "/admin/archive" }];

const AdminShell = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerH, setHeaderH] = useState(0);

  const { pathname } = useLocation();
  const mode =
    pathname.replace(/^\/+|\/+$/g, "").split("/").slice(1).join("/") || "admins";

  useLayoutEffect(() => {
    const measure = () => setHeaderH(headerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const handleToggle = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setToggleSidebar(v => !v);
      setMobileOpen(false);
    } else {
      setMobileOpen(v => !v);
      setToggleSidebar(false);
    }
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className="hidden wxl:block">
        <Sidebar
          toggle={toggleSidebar}
          title="Archive"
          logoSrc={logo}
          menu={adminMenu}
          variant="admin"
        />
      </div>

      {/* 본문 */}
      <div className="w-full flex flex-col items-stretch px-1 bg-white">
        <div ref={headerRef}>
          <AdminHeader mode={mode} onToggle={handleToggle} />
        </div>

        {/* 모바일 전용: 헤더 바로 아래 패널 */}
        <MobileMenuPanel
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          menu={adminMenu}
          offsetTop={headerH}
        />

        <div className="w-full py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminShell;
