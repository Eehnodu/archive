type Props = {
  active: boolean;
  label: string;
};

const LabelOff = ({ active, label }: Props) => (
  <span
    className={`absolute right-2 text-[10px] font-bold text-white transition-opacity ${
      active ? "opacity-0" : "opacity-100"
    }`}
  >
    {label}
  </span>
);

export default LabelOff;
