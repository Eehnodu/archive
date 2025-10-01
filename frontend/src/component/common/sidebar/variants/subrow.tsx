import { useLocation, useNavigate } from "react-router-dom";

type Props = { to: string; label: string; variant: "admin" | "client" };

const Subrow = ({ to, label, variant }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to + "/");

  const base =
    variant === "admin"
      ? "flex items-center cursor-pointer rounded-md px-4 py-1 text-base select-none transition-colors duration-200"
      : "flex items-center cursor-pointer rounded-md px-5 py-1.5 text-sm select-none transition-colors duration-200";

  const cls = active
    ? variant === "admin"
      ? "bg-sub1 text-sub2 font-semibold"
      : "bg-main/10 text-main font-semibold"
    : variant === "admin"
      ? "text-sub2/80 hover:bg-main/30 hover:text-sub2"
      : "text-main/70 hover:bg-main/5 hover:text-main";

  return (
    <div
      onClick={() => navigate(to)}
      className={[base, cls].join(" ")}
      style={{ paddingLeft: variant === "admin" ? "1.25rem" : "1.5rem" }}
    >
      {label}
    </div>
  );
};

export default Subrow;
