type Props = {
  active: boolean;
  label: string;
};

const LabelOn = ({ active, label }: Props) => (
  <span
    className={`absolute left-2 text-[10px] font-bold text-white transition-opacity ${
      active ? "opacity-100" : "opacity-0"
    }`}
  >
    {label}
  </span>
);

export default LabelOn;
