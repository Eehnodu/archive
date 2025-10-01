import Button, { type ButtonProps, type Intent } from "../button";

const outlinedMap: Record<Intent, string> = {
  primary:
    "border border-main text-main bg-transparent hover:bg-main/10 " +
    "disabled:border-main/30 disabled:text-main/40 disabled:hover:bg-transparent",
  secondary:
    "border border-sub1 text-sub1 bg-transparent hover:bg-sub1/10 " +
    "disabled:border-sub1/30 disabled:text-sub1/40 disabled:hover:bg-transparent",
};

type Props = ButtonProps & { intent?: Intent };

const ButtonOutlined = ({ intent = "primary", className, ...rest }: Props) => {
  return (
    <Button className={`${outlinedMap[intent]} ${className ?? ""}`} {...rest} />
  );
};

export default ButtonOutlined;
