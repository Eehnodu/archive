import { X } from "lucide-react";
import { type ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle?: string | ReactNode;
  onClose: () => void;
};

const HeaderDefault = ({ title, subtitle, onClose }: Props) => (
  <div className="relative flex items-start gap-3 px-6 pt-3 pb-2 border-b border-main/20 shrink-0">
    <div className="flex-1 pr-8">
      <h2 id="form-modal-title" className="text-[18px] font-semibold text-main">
        {title}
      </h2>
      {subtitle && (
        <div className="mt-1 text-sm text-main/70 whitespace-pre-line">
          {subtitle}
        </div>
      )}
    </div>
    <button
      type="button"
      aria-label="닫기"
      onClick={onClose}
      className="absolute right-4 top-4 grid place-items-center w-8 h-8 rounded-lg hover:bg-main/10 active:bg-main/15"
    >
      <X className="w-5 h-5 text-main" />
    </button>
  </div>
);

export default HeaderDefault;
