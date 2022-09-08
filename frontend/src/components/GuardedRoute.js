import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const GuardedRoute = ({children}) => {
  return (
    localStorage.getItem('userdata') && children.type.name !== "LoginPage" ? children : <Navigate to="/" />
  );
};

export default GuardedRoute;
