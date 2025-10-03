// container/admin/routes/index.tsx
import { Navigate, RouteObject } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import AdminGuard from "../guard/adminGuard";
import AdminShell from "../layout/adminShell";
import AdminLogin from "../login";
import AdminArchive from "../pages/archive";
import ArchiveDetail from "../pages/archiveDetail";

export const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <AdminLogin /> },
  {
    element: <AdminGuard />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            element: <AdminShell />,
            children: [
              { index: true, element: <Navigate to="archive" replace /> },
              { path: "archive", element: <AdminArchive /> },
            ],
          },

          { path: "archive/:id", element: <ArchiveDetail /> },
        ],
      },
    ],
  },
];
