import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ArchiveBox from "../archivebox";

export type ArchiveCardProps = {
    id: number | string;
    title: string;
    description?: string;
    icon?: ReactNode;
    actionLabel?: string;
    className?: string;
    children?: ReactNode;
};

const Card = ({
    id,
    title,
    description = "설명 텍스트",
    icon,
    actionLabel = "열기",
    className,
    children,
}: ArchiveCardProps) => {
    const to = `/admin/archive/${id}`;

    return (
        <ArchiveBox className={["flex flex-col", className ?? ""].join(" ")}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                {icon && <span className="shrink-0">{icon}</span>}
                <h3 className="text-base wxl:text-lg font-semibold whitespace-nowrap break-keep truncate">
                    {title}
                </h3>
            </div>

            <div className="flex-1 px-4 py-3 text-sm text-gray-600 break-keep">
                {children ?? description}
            </div>

            <div className="px-4 py-3 border-t border-gray-200">
                <Link
                    to={to}
                    state={{ id, title, desc: description }}
                    aria-label={`${title} 상세로 이동`}
                    className="w-full block text-center rounded-lg py-2 text-sm font-medium bg-main hover:bg-mainHover text-white"
                >
                    {actionLabel}
                </Link>
            </div>
        </ArchiveBox>
    );
};

export default Card;
