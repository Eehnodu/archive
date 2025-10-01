import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/auth/useAPI";

import LeftControls from "./variants/leftControls";
import LogoutButton from "./variants/logoutButton";
import LogoutModal from "./variants/logoutModal";

interface AdminHeaderProps {
  mode: string;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHeader = ({ mode, setToggleSidebar }: AdminHeaderProps) => {
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
    <div className="flex flex-row items-center justify-between w-full p-5 pl-0 bg-[#F5F5F5]">
      <LeftControls mode={mode} onToggle={() => setToggleSidebar((v) => !v)} />
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
