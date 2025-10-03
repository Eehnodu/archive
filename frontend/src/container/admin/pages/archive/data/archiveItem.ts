export type ArchiveItem = {
    id: string;
    title: string;
    desc?: string;
};

export const ARCHIVE_ITEMS: ArchiveItem[] = [
    { id: "1", title: "문서 아카이브", desc: "계약서/보고서 모음" },
    { id: "2", title: "이미지 보관함", desc: "배너/썸네일" },
    { id: "3", title: "영상 자료", desc: "홍보/튜토리얼" },
    { id: "4", title: "로그 기록", desc: "시스템/접속 로그" },
    { id: "5", title: "월간 리포트", desc: "성과/지표" },
    { id: "6", title: "백업 데이터", desc: "DB/파일 백업" },
];