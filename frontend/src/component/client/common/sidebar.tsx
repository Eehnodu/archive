import OpenSideBarSVG from "@/assets/client/common/openSideBar";
import HomeSVG from "@/assets/client/common/home";
import GenerateSVG from "@/assets/client/common/create";
import SampleSVG from "@/assets/client/common/sample";
import { SideBarProps } from "@/types/client_type";
import CloseSideBarSVG from "@/assets/client/common/closeSideBar";

const ClientSideBar = ({ isSideBarOpen, setIsSideBarOpen }: SideBarProps) => {
  return (
    <div
      className={`flex flex-col gap-5 border-r border-r-gray-300 
      transition-all duration-300 ease-in-out 
      ${isSideBarOpen ? "w-32" : "w-8"} bg-white`}
    >
      <div className="w-full h-full flex flex-col gap-1 text-sm text-gray-700">
        {/* Toggle Button */}
        {isSideBarOpen ? (
          <CloseSideBarSVG setIsSideBarOpen={setIsSideBarOpen} />
        ) : (
          <OpenSideBarSVG setIsSideBarOpen={setIsSideBarOpen} />
        )}

        {/* Menu Items */}
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <div className="w-8 flex justify-center">
            <HomeSVG />
          </div>
          <span
            className={`whitespace-nowrap transition-all duration-300 ease-in-out
            ${
              isSideBarOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-10px]"
            }`}
          >
            메인 페이지
          </span>
        </div>

        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => {
            window.location.href = "/create";
          }}
        >
          <div className="w-8 flex justify-center">
            <GenerateSVG />
          </div>
          <span
            className={`whitespace-nowrap transition-all duration-300 ease-in-out
            ${
              isSideBarOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-10px]"
            }`}
          >
            영상 생성
          </span>
        </div>

        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => {
            window.location.href = "/sample";
          }}
        >
          <div className="w-8 flex justify-center">
            <SampleSVG />
          </div>
          <span
            className={`whitespace-nowrap transition-all duration-300 ease-in-out
            ${
              isSideBarOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-10px]"
            }`}
          >
            영상 샘플 갤러리
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientSideBar;
