import { useState } from "react";
import black_setting from "/black_setting.svg";
import Place from "./settings/place";
import Sequence from "./settings/sequence";
import Camera from "./settings/camera";
import close from "/close.svg";
import { usePost } from "@/hooks/auth/useAPI";

const SettingModal = ({ setIsSettings }) => {
  const [location, setLocation] = useState<string>("");
  const [sequence, setSequence] = useState<string>("");
  const [camera, setCamera] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [fov, setFov] = useState<string>("");

  const isValid =
    location.trim() !== "" &&
    sequence.trim() !== "" &&
    camera.trim() !== "" &&
    height.trim() !== "" &&
    angle.trim() !== "" &&
    fov.trim() !== "";

  const saveSettingMutation = usePost("api/userSettings/saveSettings");
  const saveSettings = () => {
    angle.slice(0, -1);
    saveSettingMutation.mutate(
      {
        user_id: 1,
        location,
        sequence,
        camera,
        height,
        angle,
        fov,
      },
      {
        onSuccess: () => {
          setIsSettings(false);
        },
      },
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
      <div className="bg-white flex flex-col relative p-5 rounded-md gap-5">
        <img
          src={close}
          alt=""
          className="absolute top-3 right-3 cursor-pointer"
          onClick={() => setIsSettings(false)}
        />
        <div className="flex flex-row gap-3 items-center">
          <img src={black_setting} alt="" className="h-6" />
          <span className="font-bold text-xl">영상 생성 설정값</span>
        </div>
        <Place location={location} setLocation={setLocation} />
        <Sequence sequence={sequence} setSequence={setSequence} />
        <span className="font-semibold text-lg">카메라 파라미터</span>
        <Camera
          camera={camera}
          setCamera={setCamera}
          height={height}
          setHeight={setHeight}
          angle={angle}
          setAngle={setAngle}
          fov={fov}
          setFov={setFov}
        />
        <div className="mt-10 flex items-center justify-center w-full">
          <button
            className="disabled:bg-gray-500 bg-black text-white w-1/2 p-2 rounded-lg disabled:cursor-not-allowed"
            disabled={!isValid}
            onClick={saveSettings}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
