import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Routes>
      {/* Route for User routes */}
      <Route path="/*" element={<UserRoutes />} />
      {/* Route for Admin routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
