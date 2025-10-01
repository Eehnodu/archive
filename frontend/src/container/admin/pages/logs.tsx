import { useState } from "react";
import { Image } from "lucide-react";
import Button from "@/component/common/button";
import {
  DateRangePicker,
  type DateRange,
  DateUtils,
} from "@/component/common/datePicker";
import Pagination from "@/component/common/pagination";
import Table, { TableColumn } from "@/component/common/table";
import { useGet } from "@/hooks/auth/useAPI";
import { formatDateTime } from "@/utils/format/date";
import {
  logListResponse,
  setting_entity,
  media_item,
} from "@/types/admin_type";
import SortSelector, { SortOption } from "@/component/common/sortSelector";
import { useQueryClient } from "@tanstack/react-query";
import FormModal from "@/component/common/formModal";
import SettingForm from "@/component/admin/logs/settingForm";
import MediaForm from "@/component/admin/logs/mediaForm";

const COLUMNS: TableColumn[] = [
  { header: "No.", width: "64px", align: "center" },
  { header: "영상 생성일자", width: "minmax(110px,1fr)", align: "center" },
  { header: "유저명", width: "minmax(100px,0.8fr)", align: "center" },
  { header: "참조 이미지 영상", width: "minmax(80px,0.8fr)", align: "center" },
  { header: "영상 생성 설정값", width: "minmax(120px,1.2fr)", align: "center" },
  { header: "생성 영상", width: "minmax(8px,0.8fr)", align: "center" },
];

type MediaKind = "image" | "video";

function AdminLogs() {
  const queryClient = useQueryClient();
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [page, setPage] = useState(1);
  const [rowCount] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");
  const [settingModal, setSettingModal] = useState(false);
  const [settings, setSettings] = useState<setting_entity | null>(null);
  const [mediaModal, setMediaModal] = useState(false);
  const [mediaKind, setMediaKind] = useState<MediaKind>("image");
  const [mediaTitle, setMediaTitle] = useState<string>("");
  const [mediaSubtitle, setMediaSubtitle] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<media_item | null>(null);

  /* ---------- api url ---------- */
  const sp = new URLSearchParams();
  sp.set("page", String(page));
  sp.set("row_count", String(rowCount));
  const trimmed = searchValue.trim();
  if (trimmed) sp.set("search_value", trimmed);
  if (range.start) sp.set("start", DateUtils.fmt(range.start));
  if (range.end) sp.set("end", DateUtils.fmt(range.end));
  if (sort) sp.set("sort", sort);
  const apiUrl = `api/logs/logsList?${sp.toString()}`;

  const { data: logsData } = useGet<logListResponse>(apiUrl, ["logs", apiUrl]);

  /** derived */
  const rows = logsData?.data ?? [];
  const total = logsData?.total ?? 0;
  const totalPages = logsData?.totalPages ?? 1;

  /* ---------- table cells ---------- */
  const cells: React.ReactNode[][] = rows.map((r) => [
    r.id,
    formatDateTime(r.created_at, "-"),
    r.user_name,

    // 참조 이미지 영상 버튼
    <div key={`ref-${r.id}`} className="flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outlined"
        intent="primary"
        className="h-8 px-2 text-xs rounded-lg !font-semibold"
        onClick={() => {
          setSelectedItem(r);
          setMediaKind("image");
          setMediaTitle(r.upload_title);
          setMediaSubtitle(formatDateTime(r.created_at, "-"));
          setMediaModal(true); // 필요시 모달 오픈
        }}
      >
        <Image className="w-4 h-4" />
      </Button>
    </div>,

    <div
      key={`setting-${r.id}`}
      className="flex items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="outlined"
        intent="primary"
        className="h-8 px-2 text-xs rounded-lg !font-semibold"
        onClick={() => {
          setSettings(r.settings);
          setSettingModal(true);
        }}
      >
        보기
      </Button>
    </div>,

    // 생성 영상 버튼
    <div key={`gen-${r.id}`} className="flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outlined"
        intent="primary"
        className="h-8 px-2 text-xs rounded-lg !font-semibold"
        onClick={() => {
          setSelectedItem(r);
          setMediaKind("video");
          setMediaTitle(r.create_title);
          setMediaSubtitle(formatDateTime(r.created_at, "-"));
          setMediaModal(true);
        }}
      >
        <Image className="w-4 h-4" />
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
            options={["latest", "name"]}
            onChange={setSort}
          />

          {/* 오른쪽: 검색 폼(우측 정렬) */}
          <div className="flex-1">
            <div className="ml-auto w-full grid auto-rows-min items-end gap-2 justify-end grid-cols-[7rem_16rem_16rem_3.75rem]">
              {/* 날짜 선택 */}
              <div className="col-start-2 col-span-1 row-start-2">
                <DateRangePicker
                  value={range}
                  onChange={(v) => {
                    setRange(v);
                    setPage(1);
                  }}
                  placeholder="yyyy.mm.dd"
                />
              </div>

              {/* 검색어 입력 */}
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
          emptyText="사용된 기록이 없습니다."
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

      {settingModal && (
        <FormModal
          onClose={() => setSettingModal(false)}
          title="영상 생성 설정값"
          headerType="center"
          numbers={0}
          size="sm"
        >
          <SettingForm settings={settings} />
        </FormModal>
      )}

      {mediaModal && (
        <FormModal
          onClose={() => setMediaModal(false)}
          title={mediaTitle}
          subtitle={mediaSubtitle}
          headerType="left"
          numbers={0}
          size="xl"
        >
          <MediaForm kind={mediaKind} item={selectedItem} />
        </FormModal>
      )}
    </div>
  );
}

export default AdminLogs;
