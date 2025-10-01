import { useState, useEffect, useRef } from "react";
import down_arrow from "/down_arrow.svg";

const HeightDetail = ({ height, setHeight }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const heightOptions = ["3m 미만", "3m~5m", "5m 초과"];

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
      <span>높이</span>
      <div
        className="cursor-pointer relative flex flex-row items-center justify-between border border-gray-300 rounded-md pl-3 p-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {height ? (
          <span>{height}</span>
        ) : (
          <span className="text-gray-400">높이를 선택해주세요.</span>
        )}
        <img src={down_arrow} alt="" className="w-6 h-6" />
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full border border-gray-300 bg-white rounded-md shadow-md z-10">
            {heightOptions.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setHeight(option);
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

export default HeightDetail;
