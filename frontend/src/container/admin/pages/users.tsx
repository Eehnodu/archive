import { useState } from "react";
import { Trash2 } from "lucide-react";
import Button from "@/component/common/button";
import {
  DateRangePicker,
  type DateRange,
  DateUtils,
} from "@/component/common/datePicker";
import Pagination from "@/component/common/pagination";
import Table, { TableColumn } from "@/component/common/table";
import { useGet, usePost } from "@/hooks/auth/useAPI";
import { formatDateTime } from "@/utils/format/date";
import { apiError, apiOk, userListResponse } from "@/types/admin_type";
import Modal from "@/component/common/modal";
import SortSelector, { SortOption } from "@/component/common/sortSelector";
import { useQueryClient } from "@tanstack/react-query";

const COLUMNS: TableColumn[] = [
  { header: "No.", width: "64px", align: "center" },
  { header: "생성일자", width: "minmax(110px,1fr)", align: "center" },
  { header: "유저명", width: "minmax(100px,0.8fr)", align: "center" },
  { header: "이메일 주소", width: "minmax(140px,1.4fr)", align: "center" },
  { header: "생성 영상 개수", width: "minmax(80px,0.8fr)", align: "center" },
  { header: "회원 탈퇴 처리", width: "minmax(120px,0.8fr)", align: "center" },
];

function AdminUsers() {
  const queryClient = useQueryClient();
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [page, setPage] = useState(1);
  const [rowCount] = useState(10);
  const [searchType, setSearchType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");
  const [deleteModal, setDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  // mutations
  const deleteMutation = usePost<{ id: number }, apiOk, apiError>(
    "api/users/delete"
  );

  /* ---------- api url ---------- */
  const sp = new URLSearchParams();
  sp.set("page", String(page));
  sp.set("row_count", String(rowCount));
  if (searchType !== "all") sp.set("search_type", searchType);
  const trimmed = searchValue.trim();
  if (trimmed) sp.set("search_value", trimmed);
  if (range.start) sp.set("start", DateUtils.fmt(range.start));
  if (range.end) sp.set("end", DateUtils.fmt(range.end));
  if (sort) sp.set("sort", sort);
  const apiUrl = `api/users/userList?${sp.toString()}`;

  const { data: usersData } = useGet<userListResponse>(apiUrl, [
    "users",
    apiUrl,
  ]);

  /** derived */
  const rows = usersData?.data ?? [];
  const total = usersData?.total ?? 0;
  const totalPages = usersData?.totalPages ?? 1;

  /* ---------- table cells ---------- */
  const cells: React.ReactNode[][] = rows.map((r) => [
    r.id,
    formatDateTime(r.created_at, "-"),
    r.user_name,
    r.user_email,
    r.user_image_count,
    <div key={`a-${r.id}`} className="flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outlined"
        intent="primary"
        className="h-8 px-2 text-xs rounded-lg !font-semibold"
        onClick={() => {
          setPendingDeleteId(r.id);
          setDeleteModal(true);
        }}
      >
        회원 탈퇴
      </Button>
    </div>,
  ]);

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* filters */}
      <header className="w-full px-10 pt-2 border-gray-200">
        <div className="flex items-end justify-between gap-4 pl-2">
          <SortSelector
            value={sort}
            options={["latest", "image_count"]}
            onChange={setSort}
          />

          {/* 오른쪽: 검색 폼(우측 정렬) */}
          <div className="flex-1">
            <div className="ml-auto w-full grid auto-rows-min items-end gap-2 justify-end grid-cols-[2.75rem_7rem_9rem_3.75rem]">
              {/* Row 1: 기간 */}
              <p className="col-start-1 row-start-1 text-sm text-gray-700 self-center font-medium text-center">
                기간
              </p>
              <div className="col-start-2 col-span-3 row-start-1">
                <DateRangePicker
                  value={range}
                  onChange={(v) => {
                    setRange(v);
                    setPage(1);
                  }}
                  placeholder="yyyy.mm.dd ~ yyyy.mm.dd"
                />
              </div>

              {/* Row 2: 검색 */}
              <p className="col-start-1 row-start-2 text-sm text-gray-700 self-center font-medium text-center">
                검색
              </p>

              <select
                className="col-start-2 row-start-2 h-10 w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 focus:outline-none focus:border-gray-500"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="user_name">유저명</option>
                <option value="user_email">이메일 주소</option>
              </select>

              <input
                type="text"
                placeholder="검색어 입력"
                className="col-start-3 row-start-2 h-10 w-full border border-gray-300 rounded-md px-3 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <div className="col-start-4 row-start-2">
                <Button
                  type="button"
                  variant="solid"
                  intent="primary"
                  className="h-10 w-[3.75rem] p-0 flex items-center justify-center"
                  onClick={() => setPage(1)}
                >
                  조회
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* content */}
      <div className="flex flex-col w-full px-10 py-2 gap-24">
        <Table
          columns={COLUMNS}
          cells={cells}
          minWidth="1080px"
          rowCount={rowCount}
          total={total}
          emptyText="등록된 사용자가 없습니다."
        />
      </div>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          visibleCount={5}
        />
      </div>

      {/* Delete modal */}
      {deleteModal && (
        <Modal
          numbers={2}
          title="해당 유저를 탈퇴 처리 하시겠습니까?"
          warning={
            "※ 삭제 후에는 해당 유저의 계정 및 모든 관련 데이터가\n영구적으로 삭제되며 복구할 수 없습니다."
          }
          onClose={() => setDeleteModal(false)}
          onSecondary={() => setDeleteModal(false)}
          onPrimary={() => {
            if (!pendingDeleteId) return;
            deleteMutation.mutate(
              { id: pendingDeleteId },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["users"],
                    exact: false,
                  });
                },
                onSettled: () => {
                  setDeleteModal(false);
                  setPendingDeleteId(null);
                },
              }
            );
          }}
        />
      )}
    </div>
  );
}

export default AdminUsers;
