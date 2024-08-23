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
import CategoriesProvider from "./Context/CategoriesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CategoriesProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <IsReceiveCodeProvider>
                <ThemeProvider>
                  <Toaster
                    position="top-right"
                    containerStyle={{ zIndex: 9999, top: 190 }}
                  />
                  <App />
                </ThemeProvider>
              </IsReceiveCodeProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </CategoriesProvider>
    </UserContextProvider>
  </React.StrictMode>
);
