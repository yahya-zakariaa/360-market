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
import { Toaster } from "react-hot-toast";
import ProductsProvider from "./Context/productsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <IsReceiveCodeProvider>
              <ThemeProvider>
                <Toaster
                  position="top-center"
                  containerStyle={{ zIndex: 9999, top: 80 }}
                />
                <App />
              </ThemeProvider>
            </IsReceiveCodeProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </UserContextProvider>
  </React.StrictMode>
);
