// src/hooks/auth/useRefreshToken.ts
import { baseURL } from "@/utils/api/client";

/**
 * Refresh Token을 사용하여 세션을 갱신하는 훅
 *
 * 401 응답 시 `/api/auth/refresh_token`으로 요청을 보내
 * 세션을 연장합니다. 실패 시 에러를 던집니다.
 *
 * @returns refreshToken 실행 함수 (Promise<boolean>)
 *
 * @param url API endpoint
 * @example
 * const refreshToken = useRefreshToken();
 * try {
 *   await refreshToken();
 *   console.log("토큰 갱신 성공");
 * } catch (err) {
 *   console.error("세션 만료", err);
 * }
 */
export const useRefreshToken = (url: string = "api/auth/refresh") => {
  const refresh = async () => {
    const response = await fetch(`${baseURL}/${url}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 401) {
      throw new Error("세션 만료");
    }

    return true;
  };

  return refresh;
};
