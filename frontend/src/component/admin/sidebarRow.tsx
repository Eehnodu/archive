import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SidebarRow = ({ to, label }: { to: string; label: string }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to + "/");

  return (
    <div
      onClick={() => navigate(to)}
      className={[
        "cursor-pointer w-full rounded-lg px-4 py-3 text-center select-none transition-colors duration-200 text-lg font-semibold",
        active
          ? "bg-[#D9D9D9] text-[#484848] font-semibold"
          : "text-white/90 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {label}
    </div>
  );
};

export default SidebarRow;
