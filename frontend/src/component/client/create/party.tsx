import upload from "/upload.svg";
import setting from "/setting.svg";
import create from "/create.svg";

import { useRef, useState } from "react";
import SettingModal from "./setting_modal";
import { useGet } from "@/hooks/auth/useAPI";

const ClientCreateParty = () => {
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploaded(e.target.files[0]);
    }
  };

  const { data: settingsData } = useGet("api/userSettings/savedSettings", [
    "user_setting",
  ]);

  console.log(settingsData);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/2 p-5 items-center rounded-lg flex flex-col gap-5">
          <span className="text-3xl font-bold">
            단 한 번의 클릭으로, 영상을 생성해보세요.
          </span>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full h-[196px] border border-gray-300 rounded-md flex flex-col items-center justify-center gap-3">
              {uploaded ? (
                <img
                  src={URL.createObjectURL(uploaded)}
                  alt={uploaded.name}
                  className="max-h-40 object-contain"
                />
              ) : (
                <>
                  <img src={upload} alt="" className="w-8 h-8" />
                  <span>참조 이미지 및 영상을 업로드 해주세요.</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                  />
                  <button
                    onClick={handleFileClick}
                    className="border border-gray-300 px-3 py-1 rounded-md"
                  >
                    파일 업로드
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <button
              className="relative flex flex-row gap-2 text-white rounded-md px-8 py-3 bg-gray-500 items-center justify-center"
              onClick={() => setIsSettings(true)}
            >
              <img src={setting} alt="" className="absolute left-5" />
              <span>영상 생성 설정값</span>
            </button>
            <button
              className="relative flex flex-row gap-2 text-white rounded-md px-8 py-3 disabled:bg-gray-500 bg-black items-center justify-center"
              onClick={() => setIsSettings(true)}
            >
              <img src={create} alt="" className="absolute left-5" />
              <span>영상 생성</span>
            </button>
          </div>
        </div>
      </div>
      {isSettings && <SettingModal setIsSettings={setIsSettings} />}
    </>
  );
};

export default ClientCreateParty;
