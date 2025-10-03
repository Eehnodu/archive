// component/common/archiveBox/archivebox.tsx
import type { FC, ReactNode } from "react";

export interface ArchiveBoxProps {
    className?: string;
    children?: ReactNode;
}

const base =
    "h-60 rounded-xl border border-gray-300 bg-white shadow-md overflow-hidden";

const ArchiveBox: FC<ArchiveBoxProps> = ({ className, children }) => {
    return <div className={[base, className ?? ""].join(" ")}>{children}</div>;
};

export default ArchiveBox;
