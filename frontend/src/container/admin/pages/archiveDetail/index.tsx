import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ARCHIVE_ITEMS } from "../archive/data/archiveItem";

const modules = import.meta.glob("../page*/index.tsx");

const ArchiveDetail = () => {
    const navigate = useNavigate();
    const { id = "" } = useParams<{ id: string }>();
    const location = useLocation();
    const routeState = location.state as { id?: string; title?: string; desc?: string } | null;

    const meta = useMemo(() => {
        if (routeState?.title) return routeState;
        const found = ARCHIVE_ITEMS.find((x) => x.id === id);
        return found ? { id: found.id, title: found.title, desc: found.desc } : null;
    }, [routeState, id]);

    const title = meta?.title ?? meta?.id;

    const key = `../page${id}/index.tsx`;
    const loader = modules[key];

    const Page = useMemo(() => (loader ? lazy(loader as any) : null), [loader]);

    const handleBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/admin/archive", { replace: true });
    };

    return (
        <div className="w-full h-full">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3">
                    <button
                        type="button"
                        onClick={handleBack}
                        aria-label="뒤로 가기"
                        className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            className="w-5 h-5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <h1 className="text-lg wxl:text-xl font-semibold whitespace-nowrap break-keep truncate">
                        {title}
                    </h1>
                </div>
            </div>

            <div className="p-6">
                {!Page ? (
                    <div>
                        <h2 className="text-xl font-semibold">Archive Detail</h2>
                        <p className="mt-2 text-gray-600">
                            해당 ID({id})에 대응하는 페이지가 없습니다.
                        </p>
                    </div>
                ) : (
                    <Suspense fallback={<div className="p-6">아카이브 불러오는 중...</div>}>
                        <Page />
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default ArchiveDetail;
