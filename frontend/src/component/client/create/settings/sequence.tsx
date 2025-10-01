import { useState, useEffect, useRef } from "react";
import down_arrow from "/down_arrow.svg";

const Sequence = ({ sequence, setSequence }) => {
  const [isSequenceOpen, setIsSequenceOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const seqOptions = ["도난", "사고", "쓰러짐"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSequenceOpen(false);
      }
    };

    if (isSequenceOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSequenceOpen]);

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      <span>시퀀스</span>
      <div
        className="cursor-pointer relative flex flex-row items-center w-2/3 justify-between border border-gray-300 rounded-md pl-3 p-1"
        onClick={() => setIsSequenceOpen((prev) => !prev)}
      >
        {sequence ? (
          <span>{sequence}</span>
        ) : (
          <span className="text-gray-400">시퀀스를 선택해주세요.</span>
        )}
        <img src={down_arrow} alt="" className="w-6 h-6" />
        {isSequenceOpen && (
          <div className="absolute top-full left-0 mt-1 w-full border border-gray-300 bg-white rounded-md shadow-md z-10">
            {seqOptions.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSequence(option);
                  setIsSequenceOpen(false);
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

export default Sequence;
