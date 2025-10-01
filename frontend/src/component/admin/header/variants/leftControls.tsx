import burger from "@/assets/admin/burger.png";

type Props = {
  mode: string;
  onToggle: () => void;
};

const LeftControls = ({ mode, onToggle }: Props) => {
  const title = mode === "archive" ? "아카이브 관리" : "Unknown Mode";

  return (
    <div className="w-1/3 flex flex-row gap-4 text-xl font-bold px-8">
      <button onClick={onToggle}>
        <img src={burger} alt="햄버거" className="w-6 h-5" />
      </button>
      <div className="flex flex-row w-full justify-between items-center">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LeftControls;
