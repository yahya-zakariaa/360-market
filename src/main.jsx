import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "@material-tailwind/react";
import IsReceiveCodeProvider from "./Context/receiveCodeStatus.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import CartProvider, { CartContext } from "./Context/CartContext.jsx";
import WishlistProvider from "./Context/Wishlist.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CartProvider>
        <WishlistProvider>
          <IsReceiveCodeProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </IsReceiveCodeProvider>
        </WishlistProvider>
      </CartProvider>
    </UserContextProvider>
  </React.StrictMode>
);
