import { useEffect, useRef, type ReactNode } from "react";
import Header from "./variants/header";
import Body from "./variants/body";
import Footer from "./variants/footer";

export type ModalProps = {
  numbers?: 1 | 2; // 버튼 개수
  title?: string;
  description?: string; // 본문
  warning?: string; // 경고문구(작게, 빨강)
  primaryLabel?: string;
  secondaryLabel?: string; // numbers === 2일 때만 표시
  onClose: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
  icon?: ReactNode;
  closeOnOutside?: boolean;
};

const Modal = ({
  numbers = 1,
  title,
  description,
  warning,
  primaryLabel = "확인",
  secondaryLabel = "취소",
  onClose,
  onPrimary,
  onSecondary,
  icon,
  closeOnOutside = true,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // 마운트 동안 스크롤 잠금
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => {
        if (!closeOnOutside) return;
        if (e.currentTarget === e.target) onClose();
      }}
      onTouchStart={(e) => {
        if (!closeOnOutside) return;
        if (e.currentTarget === e.target) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-[400px] max-w-[92vw] rounded-2xl shadow-2xl bg-white border border-main/10"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <Header title={title} icon={icon} onClose={onClose} />

        <Body description={description} warning={warning} />

        <Footer
          numbers={numbers}
          primaryLabel={primaryLabel}
          secondaryLabel={secondaryLabel}
          onPrimary={onPrimary}
          onSecondary={onSecondary}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;
