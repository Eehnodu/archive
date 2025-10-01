type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled: boolean;
};

const Footer = ({ onCancel, onConfirm, confirmDisabled }: Props) => (
  <div className="flex items-center justify-between gap-2 pt-2">
    <div className="ml-auto flex gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="h-8 px-3 rounded-md text-sm border border-main text-main hover:bg-main/10"
      >
        취소
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={confirmDisabled}
        className="h-8 px-3 text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed bg-main hover:bg-mainHover rounded-md"
      >
        확인
      </button>
    </div>
  </div>
);

export default Footer;
