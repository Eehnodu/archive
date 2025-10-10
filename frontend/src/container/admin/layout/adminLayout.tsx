import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-1">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
