import { useState } from "react";
import { Pagination } from "@/component/common/pagination";
import { Card } from "@/component/common/archiveBox";
import { ARCHIVE_ITEMS } from "./data/archiveItem";

const PAGE_SIZE = 6;

const AdminArchive = () => {
  const items = ARCHIVE_ITEMS;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.desc}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        visibleCount={5}
        className="mt-6 justify-center"
      />
    </div>
  );
};

export default AdminArchive;
