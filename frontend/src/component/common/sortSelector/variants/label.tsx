import type { SortOption } from "../sortSelector";

type Props = {
  option: SortOption;
  active: boolean;
};

const Label = ({ option, active }: Props) => (
  <span
    className={`text-sm ${active ? "text-main font-medium" : "text-main/70"}`}
  >
    {option === "latest" ? "최신순" : "이름순"}
  </span>
);

export default Label;
