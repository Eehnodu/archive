import PageButton from "./variants/pageButton";
import NavButton from "./variants/navButton";

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
  // 페이지 범위 계산
  const count = Math.max(1, Math.min(visibleCount, totalPages));
  const start = Math.floor((page - 1) / count) * count + 1;
  const end = Math.min(totalPages, start + count - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav
      className={`flex items-center gap-2 select-none ${className}`}
      aria-label="Pagination"
    >
      {/* 이전 묶음 */}
      <NavButton
        direction="prev"
        disabled={start === 1}
        onClick={() => onChange(Math.max(1, start - 1))}
        ariaLabel="Previous pages"
      />

      {/* 페이지 번호 */}
      {pages.map((p) => (
        <PageButton
          key={p}
          active={p === page}
          label={p}
          onClick={() => onChange(p)}
          ariaCurrent={p === page ? "page" : undefined}
        />
      ))}

      {/* 다음 묶음 */}
      <NavButton
        direction="next"
        disabled={end === totalPages}
        onClick={() => onChange(Math.min(totalPages, end + 1))}
        ariaLabel="Next pages"
      />
    </nav>
  );
};

export default Pagination;
