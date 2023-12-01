import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteElement(props){
  return (
    <div>
      {props.loggedIn ? <Outlet /> : <Navigate to="/signin" replace />}
    </div>
  );
};

export {ProtectedRouteElement};
