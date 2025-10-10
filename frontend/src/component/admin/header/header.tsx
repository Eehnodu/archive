// component/admin/header/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/auth/useAPI";
import LeftControls from "./variants/leftControls";
import LogoutButton from "./variants/logoutButton";
import LogoutModal from "./variants/logoutModal";

interface AdminHeaderProps {
  mode: string;
  onToggle: () => void; // 단일 토글 콜백
}

export const AdminHeader = ({ mode, onToggle }: AdminHeaderProps) => {
  const logoutMutation = usePost("api/auth/logout");
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);

  const handleAdminLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          setLogoutModal(false);
          navigate("/admin/login");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-between w-full px-5 py-3 pl-0 bg-sub2/60">
      <LeftControls mode={mode} onToggle={onToggle} />
      <LogoutButton onClick={() => setLogoutModal(true)} />
      <LogoutModal
        open={logoutModal}
        onConfirm={handleAdminLogout}
        onClose={() => setLogoutModal(false)}
      />
    </div>
  );
};


export default AdminHeader;
