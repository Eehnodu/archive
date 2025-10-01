import { Navigate, Outlet } from "react-router-dom";

export type UserInfo = {
  id: number;
  role: string;
};

const getCookie = (name: string): string | undefined => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : undefined;
};

export const parseUserInfo = (): UserInfo | null => {
  const cookie = getCookie("user_info");
  if (!cookie) return null;
  try {
    const decoded = atob(cookie);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to parse user_info cookie", e);
    return null;
  }
};

const AdminLayout = () => {
  const user = parseUserInfo();
  const isAdminLogin = !!user;

  return (
    <div className="flex items-center justify-center w-screen h-screen p-1">
      {isAdminLogin ? <Outlet /> : <Navigate to="/admin/login" />}
    </div>
  );
};

export default AdminLayout;
