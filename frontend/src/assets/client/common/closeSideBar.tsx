const CloseSideBarSVG = ({ setIsSideBarOpen }) => {
  return (
    <div className="h-12 w-full flex items-center justify-end">
      <div
        className="w-8 h-8 flex items-center justify-center cursor-pointer"
        onClick={() => setIsSideBarOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
          <path d="m16 15-3-3 3-3" />
        </svg>
      </div>
    </div>
  );
};

export default CloseSideBarSVG;
