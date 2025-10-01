import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number; // 1-based
  totalPages: number;
  onChange: (page: number) => void;
  visibleCount?: number;
  className?: string;
};

const Pagination = ({
  page,
  totalPages,
  onChange,
  visibleCount = 5,
  className = "",
}: Props) => {
  const count = Math.max(1, Math.min(visibleCount, totalPages));
  const start = Math.floor((page - 1) / count) * count + 1;
  const end = Math.min(totalPages, start + count - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const base =
    "inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-md border text-sm transition";
  const normal = "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";
  const active = "!bg-gray-700 !text-white !border-gray-700";
  const disabled = "opacity-40 pointer-events-none";

  return (
    <nav
      className={`flex items-center gap-2 select-none ${className}`}
      aria-label="Pagination"
    >
      {/* 이전 묶음 */}
      <button
        className={`${base} ${normal} ${start === 1 ? disabled : ""}`}
        onClick={() => onChange(Math.max(1, start - 1))}
        aria-label="Previous pages"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* 페이지 번호 */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? active : normal}`}
        >
          {p}
        </button>
      ))}

      {/* 다음 묶음 */}
      <button
        className={`${base} ${normal} ${end === totalPages ? disabled : ""}`}
        onClick={() => onChange(Math.min(totalPages, end + 1))}
        aria-label="Next pages"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
