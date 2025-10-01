// src/component/admin/CompanyForm.tsx
import { useEffect, useMemo, useState } from "react";

export interface CompanyFormData {
  company_name: string;
  manager_name: string;
  manager_phone: string;
  company_id: string;
  company_password: string;
}

export interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => void;
  onValidChange?: (valid: boolean) => void;
  onValidationFail?: (message: string) => void;
  initialData?: Partial<CompanyFormData>;
  formId?: string;
  mode?: "create" | "edit";
}

/** 규칙: placeholder와 일치 */
const COMPANY_ID_RE = /^[A-Za-z0-9]{6,12}$/;
const PHONE_RE = /^010-\d{4}-\d{4}$/;
const PASSWORD_RE = /^[A-Za-z0-9!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]{8,}$/;

export default function CompanyForm({
  onSubmit,
  onValidChange,
  onValidationFail,
  initialData,
  formId = "companyForm",
}: CompanyFormProps) {
  // ----- 상태 -----
  const [companyName, setCompanyName] = useState(
    initialData?.company_name ?? ""
  );
  const [managerName, setManagerName] = useState(
    initialData?.manager_name ?? ""
  );
  const [managerPhone, setManagerPhone] = useState(
    initialData?.manager_phone ?? ""
  );
  const [companyId, setCompanyId] = useState(initialData?.company_id ?? "");
  const [companyPassword, setCompanyPassword] = useState(
    initialData?.company_password ?? ""
  );

  // ----- 형식 통과 여부 -----
  const idOk = useMemo(() => COMPANY_ID_RE.test(companyId.trim()), [companyId]);
  const phoneOk = useMemo(
    () => PHONE_RE.test(managerPhone.trim()),
    [managerPhone]
  );
  const passOk = useMemo(
    () => PASSWORD_RE.test(companyPassword.trim()),
    [companyPassword]
  );

  // ----- 버튼 활성화: 빈칸 + 형식 모두 만족 -----
  const isValid = useMemo(() => {
    const filled =
      companyName.trim() &&
      managerName.trim() &&
      managerPhone.trim() &&
      companyId.trim() &&
      companyPassword.trim();
    return !!filled && idOk && phoneOk && passOk;
  }, [
    companyName,
    managerName,
    managerPhone,
    companyId,
    companyPassword,
    idOk,
    phoneOk,
    passOk,
  ]);

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  // ----- 제출 전 상세 규칙 검사 (모달 메시지용) -----
  const validateOnSubmit = (): string | null => {
    if (!idOk) return "아이디 형식을 확인해주세요.";
    if (!phoneOk) return "연락처 형식을 확인해주세요.";
    if (!passOk) return "비밀번호 형식을 확인해주세요.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    const msg = validateOnSubmit();
    if (msg) {
      onValidationFail?.(msg);
      return;
    }

    onSubmit({
      company_name: companyName.trim(),
      manager_name: managerName.trim(),
      manager_phone: managerPhone.trim(),
      company_id: companyId.trim(),
      company_password: companyPassword.trim(),
    });
  };

  // ----- UI -----
  const inputBase =
    "h-10 w-full rounded-full px-4 text-sm outline-none border border-gray-300 focus:border-gray-600";

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-gray-900 flex items-center gap-1">
      <span className="text-black">•</span>
      {children}
      <span className="text-red-600 ml-0.5">*</span>
    </label>
  );

  return (
    <form id={formId} onSubmit={handleSubmit} className="grid gap-4">
      {/* 기업명 */}
      <div className="grid grid-cols-[7rem_1fr] items-center gap-3">
        <Label>기업명</Label>
        <input
          className={inputBase}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="기업명을 입력해주세요."
        />
      </div>

      {/* 담당자명 */}
      <div className="grid grid-cols-[7rem_1fr] items-center gap-3">
        <Label>담당자명</Label>
        <input
          className={inputBase}
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          placeholder="담당자명을 입력해주세요."
        />
      </div>

      {/* 담당자 연락처 */}
      <div className="grid grid-cols-[7rem_1fr] items-center gap-3">
        <Label>담당자 연락처</Label>
        <input
          className={inputBase}
          value={managerPhone}
          onChange={(e) => setManagerPhone(e.target.value)}
          placeholder="010-xxxx-xxxx의 형식으로 입력해주세요."
          inputMode="numeric"
          pattern="010-\d{4}-\d{4}"
        />
      </div>

      {/* 아이디 */}
      <div className="grid grid-cols-[7rem_1fr] items-center gap-3">
        <Label>아이디</Label>
        <input
          className={inputBase}
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="아이디(6~12자 이내, 영문/숫자 사용가능)"
          pattern="[A-Za-z0-9]{6,12}"
        />
      </div>

      {/* 비밀번호 */}
      <div className="grid grid-cols-[7rem_1fr] items-center gap-3">
        <Label>비밀번호</Label>
        <input
          type="password"
          className={inputBase}
          value={companyPassword}
          onChange={(e) => setCompanyPassword(e.target.value)}
          placeholder="비밀번호 (8자 이상, 문자/숫자/기호 사용가능)"
          minLength={8}
        />
      </div>
    </form>
  );
}
