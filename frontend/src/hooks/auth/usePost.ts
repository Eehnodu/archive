// src/hooks/auth/usePost.ts
import { useMutation } from "@tanstack/react-query";
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";
import { baseURL, fetchWithRefresh } from "@/utils/api/client";

/**
 * React Query 기반 POST 요청 훅
 *
 * 자동으로 401 응답 시 refreshToken()을 호출하고,
 * 재시도까지 해주는 fetch 래퍼입니다.
 *
 * @template TResponse 응답 데이터 타입
 * @template TRequest 요청 바디 타입 (object, FormData, void)
 * @template TError 에러 타입 (기본: { status?: number; message?: string })
 *
 * @param url API endpoint
 * @param fallback refresh token 갱신 실패 시 돌아갈 url
 * @param refresh_url refresh token 갱신 필요한 경우 API endpoint (기본값: "api/auth/refresh_token")
 *
 * @example
 * // JSON Body 요청
 * const createUser = usePost<UserResponse, { name: string; email: string }>("/users");
 * createUser.mutate({ name: "홍길동", email: "hong@example.com" });
 *
 * @example
 * // FormData 요청 (파일 업로드)
 * const uploadFile = usePost<{ url: string }, FormData>("/upload");
 * const fd = new FormData();
 * fd.append("file", fileInput.files[0]);
 * uploadFile.mutate(fd);
 *
 * @example
 * // 바디 없는 POST (예: 로그아웃)
 * const logout = usePost<void, void>("/auth/logout");
 * logout.mutate();
 */
export const usePost = <
  TRequest extends object | FormData | void,
  TResponse,
  TError = { status?: number; message?: string },
>(
  url: string,
  fallback = "/",
  refresh_url = "api/auth/refresh"
) => {
  const refreshToken = useRefreshToken(refresh_url);

  return useMutation<TResponse, TError, TRequest>({
    mutationFn: async (body: TRequest) => {
      const headers: HeadersInit = {};
      let fetchBody: BodyInit | undefined;

      if (body instanceof FormData) {
        fetchBody = body;
      } else if (body !== undefined) {
        fetchBody = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      const res = await fetchWithRefresh(
        `${baseURL}/${url}`,
        { method: "POST", headers, credentials: "include", body: fetchBody },
        refreshToken,
        fallback
      );

      if (!res.ok) {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          throw {
            status: res.status,
            message: data?.message ?? text,
          } as TError;
        } catch {
          throw {
            status: res.status,
            message: text || "Something went wrong",
          } as TError;
        }
      }

      return (await res.json()) as TResponse;
    },
  });
};
