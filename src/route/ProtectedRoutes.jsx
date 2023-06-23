import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../components/Login";

function ProtectedRoutes() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user, "User EXIST");
  return user ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
