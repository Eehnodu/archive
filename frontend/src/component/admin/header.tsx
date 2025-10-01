import burger from "@/assets/admin/burger.png";
import { usePost } from "@/hooks/auth/useAPI";
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal";
import { LogOut } from "lucide-react";
import { useState } from "react";

const AdminHeader = ({ mode, setToggleSidebar }) => {
  const logoutMutation = usePost("api/auth/logout");
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const handleAdminLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          setLogoutModal(true);
          navigate("/admin/login");
        },
      }
    );
  };

  return (
    <div className="flex flex-row items-center justify-between w-full p-5 pl-0 bg-[#F5F5F5]">
      <div className="w-1/3 flex flex-row gap-4 text-xl font-bold px-8">
        <button onClick={() => setToggleSidebar((prev) => !prev)}>
          <img src={burger} alt="햄버거" className="w-6 h-5" />
        </button>
        <div className="flex flex-row w-full justify-between items-center">
          {(() => {
            switch (mode) {
              case "users":
                return <span>회원 관리</span>;
              case "logs":
                return <span>사용 기록 관리</span>;
              default:
                return <span>Unknown Mode</span>;
            }
          })()}
        </div>
      </div>
      <button
        className="text-sm font-bold p-2 px-5 shadow-md rounded-lg"
        onClick={() => setLogoutModal(true)}
      >
        Logout
      </button>
      {logoutModal && (
        <Modal
          numbers={2}
          title="로그아웃"
          description={"정말로 로그아웃 하시겠습니까?"}
          primaryLabel="로그아웃"
          secondaryLabel="취소"
          icon={<LogOut className="w-5 h-5" />}
          onPrimary={() => handleAdminLogout()}
          onSecondary={() => setLogoutModal(false)}
          onClose={() => setLogoutModal(false)}
        />
      )}
    </div>
  );
};
export default AdminHeader;
