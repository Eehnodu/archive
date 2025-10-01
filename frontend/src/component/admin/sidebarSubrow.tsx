import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SidebarSubrow = ({ to, label }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === to || pathname.startsWith(to + "/");

  return (
    <div
      onClick={() => navigate(to)}
      className={[
        "flex justify-center items-center cursor-pointer rounded-md px-4 py-1 text-base text-left select-none transition-colors duration-200",
        active
          ? "bg-[#D9D9D9] text-[#484848] font-semibold"
          : "text-white/80 hover:bg-white/10 hover:text-white",
      ].join(" ")}
      style={{ paddingLeft: "1.25rem" }}
    >
      {label}
    </div>
  );
};
export default SidebarSubrow;
