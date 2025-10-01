// container/admin/layout/AdminLayout.tsx
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  // 전역 중앙 정렬/배경 등 레이아웃 역할만 수행
  return (
    <div className="flex items-center justify-center w-screen h-screen p-1">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
