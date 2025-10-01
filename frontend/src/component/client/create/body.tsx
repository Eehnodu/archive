import upload from "/upload.svg";
import create from "/create.svg";

const ClientCreateBody = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/2 p-5 border border-gray-300 rounded-lg flex flex-col gap-5">
          <span className="text-lg font-bold">영상 생성 설정</span>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              참조 이미지 및 영상 업로드(필수)
            </span>
            <div className="w-full h-[196px] border border-gray-300 rounded-md flex flex-col items-center justify-center gap-3">
              <img src={upload} alt="" className="w-8 h-8" />
              <span>참조 이미지 및 영상을 업로드 해주세요.</span>
              <button className="border border-gray-300 px-3 py-1 rounded-md">
                파일 업로드
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">장소(필수)</span>
            <select
              name="place"
              id="place"
              className="w-fit focus:outline-none border border-gray-300 rounded-md px-3 py-1"
              defaultValue="none"
            >
              <option value="none" disabled>
                장소를 선택해주세요
              </option>
              <option value="">산업현장</option>
              <option value="">건설현장</option>
              <option value="">도심빌딩</option>
              <option value="">무인매장</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">시퀀스(필수)</span>
            <select
              name="sequence"
              id="sequence"
              className="w-fit focus:outline-none border border-gray-300 rounded-md px-3 py-1"
              defaultValue="none"
            >
              <option value="none" disabled>
                시퀀스를 선택해주세요
              </option>
              <option value="">도난</option>
              <option value="">사고</option>
              <option value="">쓰러짐</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">카메라 파라미터 선택(필수)</span>
            <div className="w-2/3 flex flex-row gap-3">
              <div className="flex flex-col gap-1">
                <span>카메라</span>
                <select
                  name="place"
                  id="place"
                  className="w-fit focus:outline-none border border-gray-300 rounded-md px-3 py-1"
                  defaultValue="none"
                >
                  <option value="none" disabled>
                    없음
                  </option>
                  <option value="">RGB</option>
                  <option value="">IR</option>
                  <option value="">Depth</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <span>높이</span>
                <select
                  name="place"
                  id="place"
                  className="w-fit focus:outline-none border border-gray-300 rounded-md px-3 py-1"
                  defaultValue="none"
                >
                  <option value="none" disabled>
                    없음
                  </option>
                  <option value="">3m 미만</option>
                  <option value="">3m~5m</option>
                  <option value="">5m 초과</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <span>앵글</span>
                <select
                  name="place"
                  id="place"
                  className="w-fit focus:outline-none border border-gray-300 rounded-md px-3 py-1"
                  defaultValue="none"
                >
                  <option value="none" disabled>
                    없음
                  </option>
                  <option value="">30º</option>
                  <option value="">45º</option>
                  <option value="">90º</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <span>시야각</span>
                <select
                  name="place"
                  id="place"
                  className="w-fit focus:outline-none border border-gray-300 rounded-md px-3 py-1"
                  defaultValue="none"
                >
                  <option value="none" disabled>
                    없음
                  </option>
                  <option value="">UltraWide</option>
                  <option value="">Wide</option>
                  <option value="">Linear</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">이미지 생성 서비스 이용약관</span>
            <div className="p-3 text-sm w-full h-[136px] border border-gray-300 rounded-md flex flex-col gap-2 overflow-y-auto">
              <div className="flex flex-col">
                <span className="font-bold">제 1조(목적)</span>
                <span>
                  본 약관은 회사가 제공하는 AI 이미지 생성 서비스의 이용과
                  관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을
                  목적으로 합니다.
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">제 2조(서비스의 내용)</span>
                <span>회사는 다음과 같은 서비스를 제공합니다:</span>
                <span>AI 기반 이미지 생성 서비스 </span>
                <span>회사는 다음과 같은 서비스를 제공합니다:</span>
                <span>AI 기반 이미지 생성 서비스 </span>
                <span>회사는 다음과 같은 서비스를 제공합니다:</span>
                <span>AI 기반 이미지 생성 서비스 </span>
              </div>
            </div>
            <div className="w-full flex justify-end gap-2 text-sm items-center">
              <input type="checkbox" name="" id="" />
              <span>
                위 이용약관 및 유의사항을 모두 읽었으며, 이에 동의합니다.
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="flex flex-row gap-2 text-white rounded-md px-8 py-3 disabled:bg-gray-500  bg-black">
              <img src={create} alt="" />
              <span>이미지 생성하기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientCreateBody;
