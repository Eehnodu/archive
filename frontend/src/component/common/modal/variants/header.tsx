import { X } from "lucide-react";
import { type ReactNode } from "react";
import { ButtonTransparent } from "@/component/common/button";

type Props = {
  title?: string;
  icon?: ReactNode;
  onClose: () => void;
};

const Header = ({ title, icon, onClose }: Props) => (
  <div className="relative flex flex-col items-center gap-2 px-6 pt-6">
    {icon && (
      <div className="shrink-0 rounded-full bg-sub2 p-2 text-main">{icon}</div>
    )}

    {title && (
      <h2 id="modal-title" className="font-semibold text-black/90 text-center">
        {title}
      </h2>
    )}

    {/* 닫기 버튼 */}
    <ButtonTransparent
      type="button"
      intent="primary"
      size="sm"
      aria-label="닫기"
      onClick={onClose}
      className="absolute right-4 top-4 w-8 h-8 !p-2 rounded-lg hover:bg-main/10 active:bg/main/15"
    >
      <X className="w-5 h-5 text-main" />
    </ButtonTransparent>
  </div>
);

export default Header;
