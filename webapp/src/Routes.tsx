import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route
        path="chat"
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default Router;
