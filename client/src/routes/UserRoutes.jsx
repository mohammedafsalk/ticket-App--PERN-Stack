import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UsrHome from "../components/user/UsrHome";
import Userlogin from "../components/user/Userlogin";
import Usersignup from "../components/user/Usersignup";
import { useAuth } from "../context/context";
import { userAuthCheck } from "../services/user";

export default function UserRoutes() {
  const { setUser, refresh, user } = useAuth();

  useEffect(() => {
    (async function () {
      let { data } = await userAuthCheck();
      setUser({ login: data.loggedIn, details: data.user });
    })();
  }, [refresh]);

  return (
    <Routes>
      {user.login === true && (
        <>
          <Route path="/" element={<UsrHome />} />
          <Route path="/login" element={<Navigate to={"/"} />} />
          <Route path="/signup" element={<Navigate to={"/"} />} />
        </>
      )}
      {user.login === false && (
        <>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Userlogin />} />
          <Route path="/signup" element={<Usersignup />} />
        </>
      )}
    </Routes>
  );
}
