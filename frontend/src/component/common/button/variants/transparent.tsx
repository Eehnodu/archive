import Button, { type ButtonProps, type Intent } from "../button";

const transparentMap: Record<Intent, string> = {
  primary:
    "text-main hover:bg-main/10 " +
    "disabled:text-main/40 disabled:hover:bg-transparent",
  secondary:
    "text-sub1 hover:bg-sub1/10 " +
    "disabled:text-sub1/40 disabled:hover:bg-transparent",
};

type Props = ButtonProps & { intent?: Intent };

const ButtonTransparent = ({
  intent = "primary",
  className,
  ...rest
}: Props) => {
  return (
    <Button
      className={`${transparentMap[intent]} ${className ?? ""}`}
      {...rest}
    />
  );
};

export default ButtonTransparent;
