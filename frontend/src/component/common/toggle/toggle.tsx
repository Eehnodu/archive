import { useState } from "react";
import Knob from "./variants/knob";
import LabelOn from "./variants/labelOn";
import LabelOff from "./variants/labelOff";

export type ToggleProps = {
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
        active ? "bg-main" : "bg-sub1/60"
      }`}
    >
      <Knob active={active} />
      <LabelOn active={active} label={onLabel} />
      <LabelOff active={active} label={offLabel} />
    </button>
  );
};

export default Toggle;
