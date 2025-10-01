import { useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/auth/useAPI";
import { useMemo } from "react";

type Options = { onError?: () => void };

export const useLogin = ({ onError }: Options = {}) => {
  const navigate = useNavigate();
  const loginMutation = usePost("api/auth/login");

  const errorMsg = useMemo(() => {
    const err: any = loginMutation.error as any;
    const status = err?.status;
    if (!status) return undefined;
    if (status === 401) return "아이디 또는 비밀번호를 확인해 주세요.";
    if (status === 403)
      return "해당 계정은 비활성화되어 로그인할 수 없습니다.\n고객센터로 문의해 주세요.";
    return "로그인 처리 중 오류가 발생했습니다.";
  }, [loginMutation.error]);

  const mutate = ({ id, pw }: { id: string; pw: string }) => {
    loginMutation.mutate(
      { user_id: id, user_password: pw, role: "admin" },
      {
        onSuccess: () => navigate("/admin/archive"),
        onError: () => onError?.(),
      }
    );
  };

  return { mutate, isPending: loginMutation.isPending, errorMsg };
};
