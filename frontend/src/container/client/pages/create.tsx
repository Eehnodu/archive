import ClientHeaderWithSideBar from "@/component/client/common/headerWithSideBar";
import ClientSideBar from "@/component/client/common/sidebar";
import ClientCreateBody from "@/component/client/create/body";
import ClientCreatePartyFooter from "@/component/client/create/footer";
import ClientCreateParty from "@/component/client/create/party";
import { useState } from "react";

const ClientCreate = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  return (
    <>
      {/* 피그마 바디 */}
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
          <ClientCreateBody />
        </div>
      </div>

      {/* 라디다디위락투바디 */}
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
          <ClientCreateParty />
          <ClientCreatePartyFooter/>
        </div>
      </div>
    </>
  );
};

export default ClientCreate;
