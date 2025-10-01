export type UserInfo = {
  id: number;
  role: string; // 'admin' | 'user' 등
};

const getCookie = (name: string): string | undefined => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : undefined;
};

export const parseUserInfo = (): UserInfo | null => {
  const cookie = getCookie("user_info");
  if (!cookie) return null;
  try {
    const decoded = atob(cookie);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to parse user_info cookie", e);
    return null;
  }
};

export const isAdmin = (user: UserInfo | null) => user?.role === "admin";
