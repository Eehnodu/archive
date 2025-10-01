import Radio from "./variants/radio";
import Label from "./variants/label";

export type SortOption = "latest" | "name";

type Props = {
  value: SortOption;
  options?: SortOption[];
  onChange: (value: SortOption) => void;
};

const SortSelector = ({
  value,
  options = ["latest", "name"],
  onChange,
}: Props) => (
  <fieldset className="shrink-0">
    <legend className="sr-only">정렬</legend>
    <div className="flex items-center gap-4">
      {options.map((opt) => (
        <label
          key={opt}
          className="inline-flex items-center gap-2 cursor-pointer hover:text-main"
        >
          <Radio
            name="sort"
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <Label option={opt} active={value === opt} />
        </label>
      ))}
    </div>
  </fieldset>
);

export default SortSelector;
