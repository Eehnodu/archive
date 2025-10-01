import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseUserInfo } from "../utils/auth";
import LoginForm from "./loginForm";

const AdminLogin = () => {
  const navigate = useNavigate();
  const user = parseUserInfo();

  useEffect(() => {
    if (user) navigate("/admin/archive", { replace: true });
  }, [user, navigate]);

  return (
    <main className="relative flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="relative w-[420px] max-w-[92vw]">
        <div className="rounded-2xl bg-white/90 backdrop-blur shadow-xl ring-1 ring-black/5 p-8">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              관리자 로그인
            </h1>
          </header>
          <LoginForm />
        </div>
        <footer className="mt-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Nodu Archive. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default AdminLogin;
