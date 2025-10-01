export type SortOption = "latest" | "name" | "image_count";

type Props = {
  value: SortOption;
  options?: SortOption[];
  onChange: (value: SortOption) => void;
};

const SortSelector = ({
  value,
  options = ["latest", "image_count"],
  onChange,
}: Props) => (
  <fieldset className="shrink-0">
    <legend className="sr-only">정렬</legend>
    <div className="flex items-center gap-4">
      {options.map((opt) => (
        <label
          key={opt}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="sort"
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="peer hidden"
          />
          <span className="relative inline-block h-4 w-4 rounded-full border border-gray-400 peer-checked:border-gray-700 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:bg-black before:scale-0 peer-checked:before:scale-100 before:transition-transform" />
          <span className="text-sm text-gray-700">
            {opt === "latest"
              ? "최신순"
              : opt === "name"
                ? "이름순"
                : "이미지 수"}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);

export default SortSelector;
