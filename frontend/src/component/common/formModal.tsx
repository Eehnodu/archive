// src/component/common/FormModal.tsx
import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "@/component/common/button";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";
type FooterType = "auto" | "none";

export type FormModalProps = {
  onClose: () => void;

  // Header
  title: ReactNode;
  subtitle?: string | ReactNode;
  headerType?: "default" | "center" | "left";

  // Body
  children: ReactNode;

  // Footer (기본 버튼)
  numbers?: 0 | 1 | 2;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;

  // Form submit 연동
  formId?: string;
  primaryAsSubmit?: boolean;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
  secondaryDisabled?: boolean;

  // Size
  size?: ModalSize;
  maxBodyHeightClass?: string;

  // Footer 확장
  footerType?: FooterType; // default: "auto" (기존 numbers 로직)
  footerChildren?: ReactNode; // footerType === "none"일 때 표시할 커스텀 컨텐츠
};

const sizeClass: Record<ModalSize, string> = {
  xs: "w-[300px] max-w-[94vw]",
  sm: "w-[400px] max-w-[94vw]",
  md: "w-[560px] max-w-[94vw]",
  lg: "w-[720px] max-w-[94vw]",
  xl: "w-[960px] max-w-[96vw]",
};

const FormModal = ({
  onClose,
  title,
  headerType = "default",
  subtitle,
  children,
  numbers = 2,
  primaryLabel = "저장",
  secondaryLabel = "취소",
  onPrimary,
  onSecondary,
  formId,
  primaryAsSubmit = true,
  primaryDisabled,
  primaryLoading,
  secondaryDisabled,
  size = "md",
  maxBodyHeightClass = "max-h-[70vh]",
  footerType = "auto",
  footerChildren,
}: FormModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 락
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

  const primaryType =
    formId && primaryAsSubmit ? ("submit" as const) : ("button" as const);
  const primaryForm = formId && primaryAsSubmit ? formId : undefined;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
      onTouchStart={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        className={`${sizeClass[size]} flex flex-col rounded-2xl shadow-2xl bg-white border border-black/5`}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {headerType === "center" ? (
          <div className="relative px-6 pt-5 pb-3 border-b border-gray-300 shrink-0 flex items-center justify-center">
            <h2
              id="form-modal-title"
              className="text-lg font-semibold text-gray-900 text-center"
            >
              {title}
            </h2>
            {subtitle && (
              <div className="mt-1 text-sm text-gray-600 text-center whitespace-pre-line">
                {subtitle}
              </div>
            )}
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="absolute right-2 top-1 grid place-items-center w-8 h-8 rounded-lg hover:bg-gray-100 active:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ) : headerType === "left" ? (
          <div className="relative flex items-start gap-3 px-6 pt-3 pb-2 border-b border-gray-300 shrink-0">
            <div className="flex-1 pr-8">
              <h2
                id="form-modal-title"
                className="text-[18px] font-medium text-gray-900"
              >
                {title}
              </h2>
              {subtitle && (
                <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                  {subtitle}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="absolute right-2 top-2 grid place-items-center w-8 h-8 rounded-lg hover:bg-gray-100 active:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="relative flex items-start gap-3 px-6 pt-3 pb-2 border-b border-gray-300 shrink-0">
            <div className="flex-1 pr-8">
              <h2
                id="form-modal-title"
                className="text-[18px] font-semibold text-gray-900"
              >
                {title}
              </h2>
              {subtitle && (
                <div className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                  {subtitle}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="absolute right-4 top-4 grid place-items-center w-8 h-8 rounded-lg hover:bg-gray-100 active:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-2 py-4 grow">
          <div
            className={`${maxBodyHeightClass} overflow-y-auto scrollbar-visible scrollbar-gutter-stable`}
          >
            <div className="px-4">{children}</div>
          </div>
        </div>

        {/* Footer */}
        {footerType === "none" ? (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2 shrink-0">
            {footerChildren}
          </div>
        ) : (
          numbers !== 0 && (
            <div
              className={`px-6 py-4 border-t border-gray-100 flex items-center gap-2 shrink-0 ${
                numbers === 2 ? "justify-end" : "justify-center"
              }`}
            >
              {numbers === 2 && (
                <Button
                  type="button"
                  variant="outlined"
                  intent="primary"
                  size="md"
                  disabled={secondaryDisabled}
                  onClick={() => {
                    onSecondary?.();
                    onClose();
                  }}
                  className="h-10"
                >
                  {secondaryLabel}
                </Button>
              )}

              <Button
                type={primaryType}
                form={primaryForm}
                variant="solid"
                intent="primary"
                size="md"
                disabled={primaryDisabled || primaryLoading}
                onClick={() => {
                  if (!primaryForm || !primaryAsSubmit) onPrimary?.();
                }}
                className="h-10 relative"
              >
                {primaryLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-100 border-t-gray-500 animate-spin" />
                  </span>
                )}
                <span className={primaryLoading ? "opacity-0" : "opacity-100"}>
                  {primaryLabel}
                </span>
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FormModal;
