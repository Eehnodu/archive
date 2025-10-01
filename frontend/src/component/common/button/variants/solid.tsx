import Button, { type ButtonProps, type Intent } from "../button";

const solidMap: Record<Intent, string> = {
  primary:
    "bg-main text-white hover:bg-mainHover active:bg-mainHover/90 " +
    "disabled:bg-main/40 disabled:text-white",
  secondary:
    "bg-sub1 text-white hover:bg-sub1Hover active:bg-sub1Hover/90 " +
    "disabled:bg-sub1/40 disabled:text-white",
};

type Props = ButtonProps & { intent?: Intent };

const ButtonSolid = ({ intent = "primary", className, ...rest }: Props) => {
  return (
    <Button className={`${solidMap[intent]} ${className ?? ""}`} {...rest} />
  );
};

export default ButtonSolid;
