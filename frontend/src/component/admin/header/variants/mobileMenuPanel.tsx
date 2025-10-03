// component/admin/header/variants/MobileMenuPanel.tsx
import { Link, useLocation } from "react-router-dom";

type MenuItem = { label: string; to: string; children?: MenuItem[] };

interface Props {
    open: boolean;
    onClose: () => void;
    menu: MenuItem[];
    offsetTop: number; // 헤더 높이(px)
}

const MobileMenuPanel = ({ open, onClose, menu, offsetTop }: Props) => {
    const { pathname } = useLocation();

    return (
        // 모바일 전용
        <div className="wxl:hidden">
            {/* 컨테이너: 헤더 바로 아래에 고정 */}
            <div
                className={[
                    "fixed left-0 right-0 z-40",
                    "transition-transform transition-opacity duration-200 ease-out",
                    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none",
                ].join(" ")}
                style={{ top: offsetTop }}
                role="dialog"
                aria-modal="true"
                aria-hidden={!open}
            >
                {/* 딤드: 헤더 아래영역만 덮음 */}
                <div
                    className={[
                        "fixed left-0 right-0",
                        "transition-opacity duration-200",
                        open ? "opacity-100" : "opacity-0 pointer-events-none",
                    ].join(" ")}
                    style={{ top: offsetTop, bottom: 0 }}
                    onClick={onClose}
                >
                    <div className="w-full h-full bg-black/30" />
                </div>

                {/* 실제 메뉴 박스: 헤더에 '딱 붙게' 위쪽 라운드 제거 */}
                <div className="relative bg-white border-t border-main/10 shadow-md">
                    <nav className="py-2">
                        {menu.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={onClose}
                                className={[
                                    "flex items-center justify-between px-4 py-3",
                                    "text-[15px] font-medium",
                                    pathname.startsWith(item.to) ? "text-gray-800" : "text-gray-800",
                                    "hover:bg-sub2/40 active:bg-sub2/60",
                                ].join(" ")}
                            >
                                <span className="break-keep">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuPanel;
