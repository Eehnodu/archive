import ClientFooter from "@/component/client/common/footer";
import ClientHeader from "@/component/client/common/headers";
import ClientHeaderWithSideBar from "@/component/client/common/headerWithSideBar";
import ClientSideBar from "@/component/client/common/sidebar";
import ClientMainBody from "@/component/client/main/body";
import { useState } from "react";

const ClientMain = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  return (
    <>
      {/* 기본 피그마 디자인 */}
      <div className="w-screen h-screen relative">
        <ClientHeader />
        <ClientMainBody />
        <ClientFooter />
      </div>

      {/* 사이드 바 있는 버전 */}
      <div className="w-screen h-screen relative flex flex-row">
        <ClientSideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <div
          className={`flex flex-col h-full transition-all duration-300 ease-in-out
          ${isSideBarOpen ? "w-[calc(100%-128px)]" : "w-[calc(100%-32px)]"}`}
        >
          <ClientHeaderWithSideBar />
          <ClientMainBody />
          <ClientFooter />
        </div>
      </div>
    </>
  );
};

export default ClientMain;
