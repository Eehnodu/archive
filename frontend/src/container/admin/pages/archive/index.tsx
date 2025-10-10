import { useEffect, useState } from "react";
import { Pagination } from "@/component/common/pagination";
import { Card } from "@/component/common/archiveBox";
import { ARCHIVE_ITEMS } from "./data/archiveItem";

const PAGE_SIZE = 6;

const AdminArchive = () => {
  const items = ARCHIVE_ITEMS;
  const [page, setPage] = useState(1);

  // 1) 데스크톱 여부 감지 (1024px 이상)
  const query = "(min-width: 1024px)";
  const getMatch = () => window.matchMedia(query).matches;
  const [isDesktop, setIsDesktop] = useState<boolean>(getMatch());

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    // 초기 동기화 + 리스너 등록
    setIsDesktop(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="relative w-full h-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} description={item.desc} />
        ))}
      </div>

      <div className={isDesktop ? "absolute bottom-0 left-1/2 -translate-x-1/2" : ""}>
        <div className="mt-6 flex justify-center
                  mb-16 pb-[calc(env(safe-area-inset-bottom)+8px)]
                  wxl:mb-0 wxl:pb-0">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
            visibleCount={5}
            className="justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminArchive;
