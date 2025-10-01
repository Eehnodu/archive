// src/utils/api/client.ts

/** API baseURL 설정 */
export const baseURL = (() => {
  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8000";
  }
  return "";
})();

export type RefreshFn = () => Promise<boolean>;

/**
 * fetchWithRefresh
 *
 * 401 발생 시 refresh() 실행 후 재시도하는 fetch 래퍼
 */
export async function fetchWithRefresh(
  input: RequestInfo | URL,
  init: RequestInit,
  refresh: RefreshFn,
  fallback = "/"
) {
  const doFetch = () => fetch(input, init);

  let res = await doFetch();
  if (res.status === 401) {
    const ok = await refresh();
    if (!ok) {
      window.location.href = fallback;
      throw new Error("세션 만료");
    }
    res = await doFetch();
  }
  return res;
}
