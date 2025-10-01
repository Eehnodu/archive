import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminLayout from "./container/admin";
import AdminLogin from "./container/admin/login";
import AdminPage from "./container/admin/page";
import AdminUsers from "./container/admin/pages/users";
import AdminLogs from "./container/admin/pages/logs";
import ClientMain from "./container/client/pages";
import ClientCreate from "./container/client/pages/create";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ClientMain />} />
            <Route path="/create" element={<ClientCreate />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminPage />}>
                <Route index element={<Navigate to="users" replace />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="logs" element={<AdminLogs />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
