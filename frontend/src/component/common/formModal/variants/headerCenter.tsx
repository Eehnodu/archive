import { X } from "lucide-react";
import { type ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle?: string | ReactNode;
  onClose: () => void;
};

const HeaderCenter = ({ title, subtitle, onClose }: Props) => (
  <div className="relative px-6 pt-5 pb-3 border-b border-main/20 shrink-0 flex items-center justify-center">
    <h2
      id="form-modal-title"
      className="text-lg font-semibold text-main text-center"
    >
      {title}
    </h2>
    {subtitle && (
      <div className="mt-1 text-sm text-main/70 text-center whitespace-pre-line">
        {subtitle}
      </div>
    )}
    <button
      type="button"
      aria-label="닫기"
      onClick={onClose}
      className="absolute right-2 top-1 grid place-items-center w-8 h-8 rounded-lg hover:bg-main/10 active:bg-main/15"
    >
      <X className="w-5 h-5 text-main" />
    </button>
  </div>
);

export default HeaderCenter;
