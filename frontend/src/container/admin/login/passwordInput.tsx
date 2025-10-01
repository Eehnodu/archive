import { useEffect, useRef, useState } from "react";
import { ButtonTransparent } from "@/component/common/button";
import { Lock, LockOpen, AlertCircle } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const PasswordInput = ({ value, onChange }: Props) => {
  const [showPw, setShowPw] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) =>
      setCapsLock(e.getModifierState("CapsLock"));
    el.addEventListener("keyup", handleKey);
    el.addEventListener("keydown", handleKey);
    return () => {
      el.removeEventListener("keyup", handleKey);
      el.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="login-pw" className="text-sm font-medium text-slate-700">
        비밀번호
      </label>
      <div className="relative px-4 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-200 bg-white">
        <input
          ref={inputRef}
          id="login-pw"
          type={showPw ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[90%] text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          autoComplete="current-password"
        />
        <ButtonTransparent
          type="button"
          onClick={() => setShowPw((prev) => !prev)}
          className="!p-0 absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8"
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 표시"}
        >
          {showPw ? (
            <LockOpen className="w-5 h-5" />
          ) : (
            <Lock className="w-5 h-5" />
          )}
        </ButtonTransparent>
      </div>
      {capsLock && (
        <p className="flex items-center gap-1 text-xs text-amber-600 mt-1">
          <AlertCircle className="w-4 h-4" />
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
