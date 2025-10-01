import { Modal } from "@/component/common/modal";
import { LogOut } from "lucide-react";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const LogoutModal = ({ open, onConfirm, onClose }: Props) => {
  if (!open) return null;
  return (
    <Modal
      numbers={2}
      title="로그아웃"
      description="정말로 로그아웃 하시겠습니까?"
      primaryLabel="로그아웃"
      secondaryLabel="취소"
      icon={<LogOut className="w-5 h-5" />}
      onPrimary={onConfirm}
      onSecondary={onClose}
      onClose={onClose}
    />
  );
};

export default LogoutModal;
