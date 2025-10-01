import { ButtonOutlined, ButtonSolid } from "@/component/common/button";

type Props = {
  numbers: 1 | 2;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryType: "button" | "submit";
  primaryForm?: string;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
  secondaryDisabled?: boolean;
  onClose: () => void;
};

const FooterAuto = ({
  numbers,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryType,
  primaryForm,
  primaryDisabled,
  primaryLoading,
  secondaryDisabled,
  onClose,
}: Props) => (
  <div
    className={`px-6 py-4 border-t border-main/10 flex items-center gap-2 shrink-0 ${
      numbers === 2 ? "justify-end" : "justify-center"
    }`}
  >
    {numbers === 2 && (
      <ButtonOutlined
        type="button"
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
      </ButtonOutlined>
    )}

    <ButtonSolid
      type={primaryType}
      form={primaryForm}
      intent="primary"
      size="md"
      disabled={primaryDisabled || primaryLoading}
      onClick={() => {
        if (!primaryForm || primaryType !== "submit") onPrimary?.();
      }}
      className="h-10 relative"
    >
      {primaryLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="inline-block w-4 h-4 rounded-full border-2 border-main/20 border-t-main animate-spin" />
        </span>
      )}
      <span className={primaryLoading ? "opacity-0" : "opacity-100"}>
        {primaryLabel}
      </span>
    </ButtonSolid>
  </div>
);

export default FooterAuto;
