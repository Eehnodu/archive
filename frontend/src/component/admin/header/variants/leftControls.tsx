import burger from "@/assets/admin/burger.png";

type Props = {
  mode: string;
  onToggle: () => void;
};

const LeftControls = ({ mode, onToggle }: Props) => {
  const title = mode === "archive" ? "아카이브 관리" : "Unknown Mode";

  return (
    <div className="w-full wxl:w-1/3 flex items-center gap-3 px-4 text-xl font-bold">
      <button onClick={onToggle} className="shrink-0">
        <img src={burger} alt="햄버거" className="w-5 h-5 block" />
      </button>

      <div className="flex-1 min-w-0 flex items-center">
        <span className="whitespace-nowrap break-keep truncate text-base wxl:text-xl font-bold">
          {title}
        </span>
      </div>
    </div>
  );
};

export default LeftControls;
