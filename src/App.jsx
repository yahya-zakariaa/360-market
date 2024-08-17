import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import ForgetPassword from "./pages/Authentication/ForgetPassword/ForgetPassword";
import Auth from "./pages/Authentication/Auth-Layout/Auth";
import { isReceiveCodeContext } from "./Context/receiveCodeStatus";
import ResetPassword from "./pages/Authentication/ForgetPassword/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./Context/UserContext";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import WishList from "./pages/WishList/WishList";
function App() {
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const receiveCodeStatus = useContext(isReceiveCodeContext);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {});

    axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d5b90049ad0b52b90048&limit=10"
      )
      .then((response) => {
        setPopularProducts(response.data.data);
        console.log("Popular products:", response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Router>
        <Toaster
          position="top-center"
          containerStyle={{ zIndex: 9999, top: 80 } }
        />
        <Routes>
          <Route element={<Layout />} path="/">
            <Route
              element={
                <Home
                  categories={categories}
                  popularProducts={popularProducts}
                />
              }
              index={true}
            />

            <Route element={<Home />} path="/home"></Route>
            <Route
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
              path="/cart"
            />
            <Route
              element={
                <ProtectedRoute>
                  <WishList />
                </ProtectedRoute>
              }
              path="/wishlist"
            />
          </Route>
          <Route element={<ProductDetails />} path="/product/:id" />
          <Route element={<Auth />} path="/login">
            <Route element={<Login />} index={true} />
            <Route element={<ForgetPassword />} path="/login/forget-Password" />
            {receiveCodeStatus.isReceiveCode && (
              <Route element={<ResetPassword />} path="/login/reset-password" />
            )}
          </Route>
          <Route element={<Signup />} path="/signup" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
