import React from "react";
import AuthErorr from "../Errors/AuthErorr";
import Checkout from "../Checkout/Checkout";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <AuthErorr />;
  }

  return children;
}
