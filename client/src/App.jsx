import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
