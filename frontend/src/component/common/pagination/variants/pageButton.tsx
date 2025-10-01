type Props = {
  active?: boolean;
  label: number | string;
  onClick: () => void;
  ariaCurrent?: "page" | undefined;
};

const base =
  "inline-flex items-center justify-center h-8 min-w-8 px-2 rounded-md border text-sm transition";
const normal =
  "border-main/30 text-main bg-white hover:bg-main/5 active:bg-main/10";
const activeClass = "!bg-main !text-white !border-main";

const PageButton = ({ active = false, label, onClick, ariaCurrent }: Props) => (
  <button
    onClick={onClick}
    aria-current={ariaCurrent}
    className={`${base} ${active ? activeClass : normal}`}
  >
    {label}
  </button>
);

export default PageButton;
