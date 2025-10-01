import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminLayout from "./container/admin";
import AdminLogin from "./container/admin/login";
import AdminPage from "./container/admin/page";
import AdminArchive from "./container/admin/pages/archive";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminPage />}>
                <Route index element={<Navigate to="archive" replace />} />
                <Route path="archive" element={<AdminArchive />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
