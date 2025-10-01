/**
 * ₩12,345
 */
export function formatCurrencyKRW(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "₩0";
  return `₩${value.toLocaleString("ko-KR")}`;
}

/**
 * $12,345
 */
export function formatCurrencyUSD(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "$0";
  return `$${value.toLocaleString("en-US")}`;
}

/**
 * 12,345원
 */
export function formatNumberKRW(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "0원";
  return `${value.toLocaleString("ko-KR")}원`;
}

/**
 * 12,345달러
 */
export function formatNumberUSD(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "0달러";
  return `${value.toLocaleString("en-US")}달러`;
}

/**
 * 12,345 point
 */

export function formatNumberPointEN(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "0포인트";
  return `${value.toLocaleString("ko-KR")} point`;
}

/**
 * 12,345 포인트
 */
export function formatNumberPointKR(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "0원";
  return `${value.toLocaleString("ko-KR")} 포인트`;
}

export function formatNumberCredit(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "0 credit";
  return `${value.toLocaleString("ko-KR")} credit`;
}

/**
 * 한국 전화번호 포맷터
 * - 01012345678  → 010-1234-5678
 * - 0112345678   → 011-234-5678
 * - 021234567    → 02-123-4567
 * - 0212345678   → 02-1234-5678
 * - 0312345678   → 031-234-5678
 * - 12345678     → 1234-5678
 */
export function formatPhoneKR(
  value: string | number | null | undefined
): string {
  if (value == null) return "";
  const digits = String(value).replace(/\D/g, "");

  if (!digits) return "";

  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  const areaLen = digits.startsWith("02") ? 2 : 3;

  if (digits.length <= areaLen) {
    return digits;
  }

  const rest = digits.slice(areaLen);

  if (rest.length <= 4) {
    return `${digits.slice(0, areaLen)}-${rest}`;
  }

  const last4 = rest.slice(-4);
  const mid = rest.slice(0, rest.length - 4);

  return `${digits.slice(0, areaLen)}-${mid}-${last4}`;
}
