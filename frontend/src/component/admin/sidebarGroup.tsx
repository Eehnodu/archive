const SidebarGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full pb-3">
      <div className="px-4 pb-2 text-center text-white/90 rounded-lg font-semibold text-lg">
        {title}
      </div>
      <div className="mt-1 flex flex-col">{children}</div>
    </div>
  );
};

export default SidebarGroup;
