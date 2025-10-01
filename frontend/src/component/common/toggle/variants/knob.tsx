type Props = {
  active: boolean;
};

const Knob = ({ active }: Props) => (
  <span
    className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-300 ${
      active ? "translate-x-8" : "translate-x-1"
    }`}
  />
);

export default Knob;
