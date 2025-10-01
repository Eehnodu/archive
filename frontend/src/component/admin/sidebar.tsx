import logo from "@/assets/image.png";
import SidebarRow from "./sidebarRow";

interface Props {
  toggleSidebar: boolean;
}

const AdminSidebar = ({ toggleSidebar }: Props) => {
  return (
    <aside
      className={[
        "h-full transition-all duration-300 ease-in-out",
        toggleSidebar ? "w-72" : "w-0 overflow-hidden",
      ].join(" ")}
    >
      <div className="h-full bg-[#242424] text-white rounded-2xl shadow-lg flex flex-col">
        <div className="h-20 w-full flex items-center justify-center bg-[#242424] rounded-t-2xl">
          <div className="text-2xl w-full font-medium flex flex-row justify-center gap-4 items-center">
            <img src={logo} alt="" className="w-8 h-8 rounded-full" />
            <span>PHARMBASE</span>
          </div>
        </div>

        <div className="flex-1 px-4 py-8 flex flex-col gap-12">
          <SidebarRow to="/admin/users" label="회원 관리" />
          <SidebarRow to="/admin/logs" label="사용 기록 관리" />
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
