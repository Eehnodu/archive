type Props = {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
};

const Radio = ({ name, value, checked, onChange }: Props) => (
  <input
    type="radio"
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    className="peer hidden"
  />
);

export default Radio;
