import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Adminhome from "../components/admin/Adminhome";
import Adminlogin from "../components/admin/Adminlogin";
import { adminAuthCheck } from "../services/admin";
import { useAuth } from "../context/context";

export default function AdminRoutes() {
  const { setAdmin, admin, refresh } = useAuth();
  useEffect(() => {
    (async function () {
      let { data } = await adminAuthCheck();
      setAdmin({ login: data.loggedIn, details: data.admin });
    })();
  }, [refresh]);
  return (
    <Routes>
      {admin.login === true && (
        <>
          <Route path="/" element={<Adminhome />} />
          <Route path="/login" element={<Navigate to={"/admin"} />} />
        </>
      )}

      {admin.login === false && (
        <>
          <Route path="/" element={<Navigate to={"/admin/login"} />} />
          <Route path="/login" element={<Adminlogin />} />
        </>
      )}
    </Routes>
  );
}
