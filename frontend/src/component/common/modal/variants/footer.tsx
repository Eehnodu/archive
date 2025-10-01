import { ButtonOutlined, ButtonSolid } from "@/component/common/button";

type Props = {
  numbers: 1 | 2;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose: () => void;
};

const Footer = ({
  numbers,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  onClose,
}: Props) => (
  <div className="px-6 py-6 flex w-full items-center justify-center gap-2">
    {numbers === 2 ? (
      <>
        <ButtonOutlined
          type="button"
          intent="primary"
          size="md"
          onClick={() => {
            onSecondary?.();
            onClose();
          }}
          className="h-10 min-w-[120px]"
        >
          {secondaryLabel}
        </ButtonOutlined>

        <ButtonSolid
          type="button"
          intent="primary"
          size="md"
          onClick={() => {
            onPrimary?.();
          }}
          className="h-10 min-w-[120px]"
        >
          {primaryLabel}
        </ButtonSolid>
      </>
    ) : (
      <ButtonSolid
        type="button"
        intent="primary"
        size="md"
        onClick={() => {
          onPrimary?.();
        }}
        className="h-10 px-6"
      >
        {primaryLabel}
      </ButtonSolid>
    )}
  </div>
);

export default Footer;
