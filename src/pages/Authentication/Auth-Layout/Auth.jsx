import React from "react";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="loginSec w-full h-screen relative z-20">
      <div className="container mx-auto flex items-center justify-center  h-full z-50 relative">
        <Outlet />
      </div>
    </div>
  );
}
