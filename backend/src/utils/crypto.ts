// utils/crypto.ts
import bcrypt from "bcrypt";
import { createHash } from "crypto";

// SALT_ROUNDS: 해시 강도(라운드 수)
// 숫자가 높을수록 해시 연산이 느려져 보안은 강해지지만 CPU 부담이 커짐
// 일반적으로 10~12 권장 (운영 환경 성능 고려)
const SALT_ROUNDS = 10;

export function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * 비밀번호 해싱
 * -------------
 * bcrypt.hash()는 아래 과정을 수행:
 * 1) 랜덤 Salt 생성
 * 2) 평문 비밀번호 + Salt 조합
 * 3) 지정된 라운드 수만큼 반복해서 해시 연산
 * 4) 최종 해시 문자열 반환
 *
 * 해시 결과 문자열 예시:
 * $2b$10$eM8JxGdKhLXv5HTPEkQq7O8a9R0M9eG9f5t3fwr1TfA3mWWcVQ50y
 * └─┬─┘ └┬┘ └─────────────┬──────────────┘ └───────────────┬───────────────┘
 *   │    │        │                        │
 *   │    │        │                        └─ 실제 비밀번호 해시
 *   │    │        └─ Salt (랜덤 값)
 *   │    └─ 라운드 수 (10 = 2^10번 해싱)
 *   └─ bcrypt 버전 (2b)
 */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * 비밀번호 비교
 * -------------
 * bcrypt.compare()는 해시 안의 Salt와 라운드 정보를 자동으로 읽어서,
 * 같은 방식으로 입력 비밀번호를 해싱 후 DB 해시와 비교.
 *
 * 개발자가 Salt나 라운드를 직접 넘길 필요 없음 (해시 문자열에 포함되어 있음)
 * 결과: 일치하면 true, 불일치하면 false 반환
 */
export async function comparePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}
