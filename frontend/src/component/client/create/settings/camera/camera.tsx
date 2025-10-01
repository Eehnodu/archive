import { useState, useEffect, useRef } from "react";
import down_arrow from "/down_arrow.svg";

const CameraDetail = ({ camera, setCamera }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cameraOptions = ["RGB", "IR", "Depth"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-[200px] flex flex-col gap-1" ref={dropdownRef}>
      <span>카메라</span>
      <div
        className="cursor-pointer relative flex flex-row items-center justify-between border border-gray-300 rounded-md pl-3 p-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {camera ? (
          <span>{camera}</span>
        ) : (
          <span className="text-gray-400">카메라를 선택해주세요.</span>
        )}
        <img src={down_arrow} alt="" className="w-6 h-6" />
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full border border-gray-300 bg-white rounded-md shadow-md z-10">
            {cameraOptions.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setCamera(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraDetail;
