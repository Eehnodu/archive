import { useState } from "react";
import close from "/close.svg";
const ClientCreatePartyFooter = () => {
  const [isTerms, setIsTerms] = useState<boolean>(false);
  const [isEthics, setIsEthics] = useState<boolean>(false);
  return (
    <>
      <div className="h-12 w-full flex items-center justify-center">
        <span className="text-sm text-gray-600">
          영상 생성 시,&nbsp;
          <span
            className="underline cursor-pointer"
            onClick={() => setIsTerms(true)}
          >
            서비스 약관
          </span>
          &nbsp;및&nbsp;
          <span
            className="underline cursor-pointer"
            onClick={() => setIsEthics(true)}
          >
            윤리적 사용 지침
          </span>
          에 동의하는 것으로 간주됩니다.
        </span>
      </div>
      {isTerms && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
          <div className="bg-white w-1/3 h-2/3 rounded-xl">
            <div className="flex items-center justify-center border-b border-b-gray-300 h-12 relative">
              <img
                src={close}
                alt=""
                className="cursor-pointer absolute right-3"
                onClick={() => setIsTerms(false)}
              />
              <span>서비스 약관</span>
            </div>
          </div>
        </div>
      )}
      {isEthics && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
          <div className="bg-white w-1/3 h-2/3 rounded-xl">
            <div className="flex items-center justify-center border-b border-b-gray-300 h-12 relative">
              <img
                src={close}
                alt=""
                className="cursor-pointer absolute right-3"
                onClick={() => setIsEthics(false)}
              />
              <span>윤리적 사용 지침</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientCreatePartyFooter;
