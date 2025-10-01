import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import Button from "@/component/common/button";

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
        className="w-[400px] max-w-[92vw] rounded-2xl shadow-2xl bg-white border border-black/5"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex flex-col items-center gap-2 px-6 pt-6">
          {icon && (
            <div className="shrink-0 rounded-full bg-gray-100 p-2 text-gray-700">
              {icon}
            </div>
          )}
          <h2
            id="modal-title"
            className="font-semibold text-gray-900 text-center"
          >
            {title}
          </h2>

          {/* 닫기 버튼 */}
          <Button
            type="button"
            variant="transparented" // Button 컴포넌트에서 transparent로 정규화됨
            intent="secondary"
            size="sm"
            aria-label="닫기"
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 !p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="px-6 pb-0 pt-3">
          <p className="body-md-medium text-gray-700 whitespace-pre-line text-center">
            {description}
          </p>
          {warning && (
            <p className="mt-2 text-center text-[13px] leading-5 text-red-600 whitespace-pre-line">
              {warning}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-6 flex w-full items-center justify-center gap-2">
          {numbers === 2 ? (
            <>
              <Button
                type="button"
                variant="outlined"
                intent="primary"
                size="md"
                onClick={() => {
                  onSecondary?.();
                  onClose();
                }}
                className="h-10 min-w-[120px]"
              >
                {secondaryLabel}
              </Button>

              <Button
                type="button"
                variant="solid"
                intent="primary"
                size="md"
                onClick={() => {
                  onPrimary?.();
                }}
                className="h-10 min-w-[120px]"
              >
                {primaryLabel}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="solid"
              intent="primary"
              size="md"
              onClick={() => {
                onPrimary?.();
              }}
              className="h-10 px-6"
            >
              {primaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
