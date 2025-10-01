import { useState } from "react";

type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
};

const Toggle = ({
  checked = false,
  onChange,
  onLabel = "ON",
  offLabel = "OFF",
}: ToggleProps) => {
  const [active, setActive] = useState(checked);

  const handleClick = () => {
    const newValue = !active;
    setActive(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 ${
        active ? "bg-black" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${
          active ? "translate-x-8" : "translate-x-1"
        }`}
      />

      <span
        className={`absolute left-2 text-[10px] font-bold text-white transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {onLabel}
      </span>

      <span
        className={`absolute right-2 text-[10px] font-bold text-white transition-opacity ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        {offLabel}
      </span>
    </button>
  );
};

export default Toggle;
