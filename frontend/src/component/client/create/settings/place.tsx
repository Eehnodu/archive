import { useState, useEffect, useRef } from "react";
import down_arrow from "/down_arrow.svg";

const Place = ({ location, setLocation }) => {
  const [isPlaceOpen, setIsPlaceOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const placeOptions = ["산업현장", "건설현장", "도심빌딩"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPlaceOpen(false);
      }
    };

    if (isPlaceOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPlaceOpen]);

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      <span>장소</span>
      <div
        className="cursor-pointer relative flex flex-row items-center w-2/3 justify-between border border-gray-300 rounded-md pl-3 p-1"
        onClick={() => setIsPlaceOpen((prev) => !prev)}
      >
        {location ? (
          <span>{location}</span>
        ) : (
          <span className="text-gray-400">장소를 선택해주세요.</span>
        )}
        <img src={down_arrow} alt="" className="w-6 h-6" />
        {isPlaceOpen && (
          <div className="absolute top-full left-0 mt-1 w-full border border-gray-300 bg-white rounded-md shadow-md z-10">
            {placeOptions.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation(option);
                  setIsPlaceOpen(false);
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

export default Place;
