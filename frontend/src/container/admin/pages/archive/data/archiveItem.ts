export type ArchiveItem = {
    id: string;
    title: string;
    desc?: string;
};

export const ARCHIVE_ITEMS: ArchiveItem[] = [
    { id: "1", title: "GMAIL", desc: "Gmail 계정의 2단계 인증과 앱 비밀번호 설정 과정을 포함해, 백엔드에서 Gmail SMTP를 이용한 메일 전송 및 인증 로직을 직접 구성해본 과정을 정리" },
    { id: "2", title: "영상 자료", desc: "홍보/튜토리얼" },
    { id: "3", title: "영상 자료", desc: "홍보/튜토리얼" },
    { id: "4", title: "로그 기록", desc: "시스템/접속 로그" },
    { id: "5", title: "월간 리포트", desc: "성과/지표" },
    { id: "6", title: "백업 데이터", desc: "DB/파일 백업" },
];  