import { type ReactNode, useEffect, useRef } from "react";
import HeaderDefault from "./variants/headerDefault";
import HeaderCenter from "./variants/headerCenter";
import HeaderLeft from "./variants/headerLeft";
import FooterAuto from "./variants/footerAuto";
import FooterNone from "./variants/footerNone";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";
type FooterType = "auto" | "none";
type HeaderType = "default" | "center" | "left";

export type FormModalProps = {
  onClose: () => void;

  // Header
  title: ReactNode;
  subtitle?: string | ReactNode;
  headerType?: HeaderType;

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
  footerType?: FooterType;
  footerChildren?: ReactNode;
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
        className={`${sizeClass[size]} flex flex-col rounded-2xl shadow-2xl bg-white border border-main/10`}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {headerType === "center" ? (
          <HeaderCenter title={title} subtitle={subtitle} onClose={onClose} />
        ) : headerType === "left" ? (
          <HeaderLeft title={title} subtitle={subtitle} onClose={onClose} />
        ) : (
          <HeaderDefault title={title} subtitle={subtitle} onClose={onClose} />
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
          <FooterNone>{footerChildren}</FooterNone>
        ) : (
          numbers !== 0 && (
            <FooterAuto
              numbers={numbers}
              primaryLabel={primaryLabel}
              secondaryLabel={secondaryLabel}
              onPrimary={onPrimary}
              onSecondary={onSecondary}
              primaryType={primaryType}
              primaryForm={primaryForm}
              primaryDisabled={primaryDisabled}
              primaryLoading={primaryLoading}
              secondaryDisabled={secondaryDisabled}
              onClose={onClose}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FormModal;
