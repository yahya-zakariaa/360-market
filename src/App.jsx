import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import ForgetPassword from "./pages/Authentication/ForgetPassword/ForgetPassword";
import Auth from "./pages/Authentication/Auth-Layout/Auth";
import { isReceiveCodeContext } from "./Context/receiveCodeStatus";
import ResetPassword from "./pages/Authentication/ForgetPassword/ResetPassword/ResetPassword";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import WishList from "./pages/WishList/WishList";
import "react-loading-skeleton/dist/skeleton.css";
import Shop from "./pages/Shop/Shop";
import Categories from "./pages/Category/Categories";
import ProductsInCategory from "./pages/Category/ProductsInCategory";

function App() {
  const receiveCodeStatus = useContext(isReceiveCodeContext);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Home />} index={true} />

            <Route element={<Shop />} path="/shop"></Route>
            <Route element={<Categories />} path="/categories"></Route>
            <Route element={<ProductsInCategory />} path="/category/:categoryId"></Route>
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
          <Route element={<ProductDetails />} path="/product/:productId" />
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
