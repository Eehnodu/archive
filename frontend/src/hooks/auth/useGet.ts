// src/hooks/auth/useGet.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";
import { baseURL, fetchWithRefresh } from "@/utils/api/client";

/**
 * React Query 기반 GET 요청 훅
 *
 * 자동으로 401 응답 시 refreshToken()을 호출하고,
 * 재시도까지 해주는 fetch 래퍼입니다.
 *
 * @template T 응답 데이터의 타입
 *
 * @param url API endpoint
 * @param key React Query의 queryKey (배열 형태, 직렬화 가능한 값만 가능)
 * @param enabled 쿼리 실행 여부 (기본값: true)
 * @param refresh_url refresh token 갱신 필요한 경우 API endpoint (기본값: "api/auth/refresh_token")
 * @param fallback refresh token 갱신 실패 시 돌아갈 url
 * @example
 * const { data, isLoading, error } = useGet<User[]>("/users", ["users"]);
 */
export const useGet = <T>(
  url: string,
  key: (string | number)[],
  enabled = true,
  refresh_url = "api/auth/refresh",
  fallback = "/"
) => {
  const refreshToken = useRefreshToken(refresh_url);

  return useQuery<T>({
    queryKey: key,
    enabled,
    queryFn: async () => {
      const res = await fetchWithRefresh(
        `${baseURL}/${url}`,
        { credentials: "include" },
        refreshToken,
        fallback
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API 오류 ${res.status}: ${text}`);
      }
      return (await res.json()) as T;
    },
    placeholderData: keepPreviousData,
  });
};
