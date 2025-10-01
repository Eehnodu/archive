import { useLocation, useNavigate } from "react-router-dom";

type Props = { to: string; label: string; variant: "admin" | "client" };

const Row = ({ to, label, variant }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to + "/");

  const base =
    variant === "admin"
      ? "cursor-pointer w-full rounded-lg px-4 py-3 text-center select-none transition-colors duration-200 text-lg font-medium"
      : "cursor-pointer w-full rounded-md px-3 py-2 text-left select-none transition-colors duration-200 text-base";

  const cls = active
    ? variant === "admin"
      ? "bg-main text-white font-semibold"
      : "bg-main/10 text-main font-semibold"
    : variant === "admin"
      ? "text-main/80 hover:bg-main/10 hover:text-main"
      : "text-main/80 hover:bg-main/5 hover:text-main";

  return (
    <div onClick={() => navigate(to)} className={[base, cls].join(" ")}>
      {label}
    </div>
  );
};

export default Row;
