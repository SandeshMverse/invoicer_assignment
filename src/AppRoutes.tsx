import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./app/modules/auth/login/Login";
import AuthGuard from "./app/shared/guards/AuthGuard";
import SharedRoutes from "./app/shared/routes/SharedRoutes";
import MainLayout from "./app/shared/layout/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <MainLayout>
                <SharedRoutes />
              </MainLayout>
            </AuthGuard>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;