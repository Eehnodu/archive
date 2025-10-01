import video from "/media/test.mp4";

const ClientMainBody = () => {
  return (
    <>
      {" "}
      <div className="h-[calc(100%-80px)] w-full p-20">
        <div className="w-full h-full flex flex-row">
          <div className="w-1/2 h-full flex flex-col p-3 items-center justify-center gap-3">
            <div className="w-2/3 h-2/3 flex flex-col gap-3 justify-center">
              <div className="font-bold text-3xl flex flex-col">
                <span>현실같은 가상 시나리오 영상,</span>
                <span>클릭 몇 번으로 완성됩니다.</span>
              </div>
              <div className="flex flex-col">
                <span>
                  도난, 사고, 쓰러짐 등 다양한 상황을 자유롭게 설정하고, 원하는
                  장소와
                </span>
                <span>
                  카메라 조건까지 지정하면 즉시 시뮬레이션 영상이 생성되며,
                  복잡한 촬영 과정이나
                </span>
                <span>
                  비용 없이, 연구·개발·테스트에 필요한 맞춤형 영상을 손쉽게
                  확보할 수 있습니다.
                </span>
              </div>
              <button className="w-2/3 flex items-center justify-center bg-black text-white px-10 py-3 rounded-xl">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <span>영상 생성하기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 5H19V11" />
                    <path d="M19 5L5 19" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col p-3 items-center justify-center gap-3">
            <div className="w-full aspect-16/9 flex flex-col gap-3 justify-center items-center">
              <video
                src={video}
                autoPlay
                muted
                playsInline
                loop
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMainBody;
