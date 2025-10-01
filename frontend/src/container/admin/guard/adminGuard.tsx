// container/admin/guard/AdminGuard.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdmin, parseUserInfo } from "../utils/auth";

const AdminGuard = () => {
  const user = parseUserInfo();
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: pathname }} replace />;
  }
  if (!isAdmin(user)) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default AdminGuard;
