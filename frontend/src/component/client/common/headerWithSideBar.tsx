import logo from "/image.png";

const ClientHeaderWithSideBar = () => {
  return (
    <>
      <div className="flex items-center px-5 h-12 w-full border-b border-b-gray-300 justify-between">
        <div className="flex flex-row items-center gap-2">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <span className="font-semibold">RENDER WORKS</span>
        </div>
        <button className="bg-black text-white px-[18px] py-[5px] rounded-md">
          로그인
        </button>
      </div>
    </>
  );
};

export default ClientHeaderWithSideBar;
