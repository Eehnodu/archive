import { useState, useMemo } from "react";
import { LogIn, UserRound } from "lucide-react";
import { ButtonSolid } from "@/component/common/button";
import { Modal } from "@/component/common/modal";
import { useLogin } from "./useLogin";
import PasswordInput from "./passwordInput";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showError, setShowError] = useState(false);

  const { mutate, isPending, errorMsg } = useLogin({
    onError: () => setShowError(true),
  });
  const canSubmit = useMemo(() => id.trim() && pw.trim(), [id, pw]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isPending) return;
    mutate({ id, pw });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      {/* 아이디 */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="login-id"
          className="text-sm font-medium text-slate-700"
        >
          아이디
        </label>
        <div className="px-4 py-2 border border-slate-300 rounded-md flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-200 bg-white">
          <input
            id="login-id"
            type="text"
            placeholder="ID를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            autoComplete="username"
          />
          <UserRound className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* 비밀번호 */}
      <PasswordInput value={pw} onChange={setPw} />

      {/* 버튼 */}
      <ButtonSolid
        type="submit"
        intent="primary"
        full
        className="mt-1 shadow-black/10 shadow-lg disabled:opacity-50"
        leftIcon={<LogIn className="w-5 h-5" />}
        disabled={!canSubmit || isPending}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </ButtonSolid>

      {/* 오류 모달 */}
      {showError && Boolean(errorMsg) && (
        <Modal
          numbers={1}
          title="로그인 오류"
          description={errorMsg ?? "아이디 또는 비밀번호를 확인해 주세요."}
          primaryLabel="확인"
          onPrimary={() => setShowError(false)}
          onClose={() => setShowError(false)}
        />
      )}
    </form>
  );
};

export default LoginForm;
