type Props = { title?: string; logoSrc?: string; variant: "admin" | "client" };

const Header = ({ title, logoSrc, variant }: Props) => {
  const wrap =
    variant === "admin"
      ? "h-20 bg-main text-white"
      : "h-16 bg-white text-main border-b border-main/10";
  const titleClass =
    variant === "admin" ? "text-2xl font-medium" : "text-xl font-semibold";

  return (
    <div
      className={`${wrap} w-full flex items-center justify-center rounded-t-2xl`}
    >
      <div className="w-full flex flex-row justify-center gap-3 items-center">
        {logoSrc && (
          <img src={logoSrc} alt="Logo" className="w-8 h-8 rounded-full" />
        )}
        <span className={[titleClass, "whitespace-nowrap truncate max-w-[12rem]"].join(" ")}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default Header;
