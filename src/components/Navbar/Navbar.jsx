import React, { useContext, useEffect, useState } from "react";
import "../Navbar/Nav.css";
import { Badge, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/Wishlist";

export default function Navbar() {
  const { setUserToken } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const { getUserCart, userCart } = useContext(CartContext);
  const { wishlist, getWishlist } = useContext(WishlistContext);
  const Navigate = useNavigate();

  localStorage.getItem("userToken") &&
    useEffect(() => {
      getUserCart();
      getWishlist();
    }, []);

  function Logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    useLoa;
  }

  return (
    <>
      <nav
        id="navbar"
        className="w-full fixed    px-5 lg:px-16 md:px-16 bg-gray-100 py-1 flex lg:flex-col  top-0 z-[99999] transition-all duration-700 ">
        <div className=" pt-3 pb-5 flex justify-between w-full">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold justify-center"
            to={"/"}>
            <i className="fa-solid fa-circle-nodes text-[30px]"></i>
            <span className="text-black text-[20px]">360 Market</span>
          </Link>
          <ul className=" justify-start items-center w-fit gap-[50px] hidden lg:flex md:flex">
            <li className="nav-item">
              <Link href="#" className="nav-link text-black" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/shop"} className="nav-link text-black ">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link text-black" to={"/categories"}>
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Badge className="w-[2px] h-[2px] absolute top-[3px] right-[-3px]">
                <Link href="#" className="nav-link text-black">
                  Offers
                </Link>
              </Badge>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link text-black">
                Support
              </Link>
            </li>
          </ul>

          <div className="nav-actions flex gap-8 lg:gap-10 items-center  ">
            <div className="flex items-center gap-8">
              <Link
                to={"/shop"}
                className="nav-link text-black me-[-7px] md:text-[24px] text-[20px]  nav-wishlist flex items-center">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
              <Badge
                className=" mt-[-2px] me-[-7px] text-[12px] w-[1px] h-[1px] bg-transparent text-black"
                content={wishlist?.count}>
                <Link
                  to={"/wishlist"}
                  className="nav-link text-black mt-[2px] md:text-[24px] text-[20px]  nav-wishlist flex items-center">
                  <i className="fa-solid fa-heart"></i>
                </Link>
              </Badge>
              <Badge
                className="mt-[-2px] me-[-7px] text-[12px] w-[1px] h-[1px] bg-transparent text-black"
                content={userCart?.numOfCartItems}>
                <Link
                  to={"/cart"}
                  className="nav-link text-black mt-[2px] md:text-[24px] text-[20px]  nav-wishlist flex items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                </Link>
              </Badge>
            </div>
            <button
              onClick={() => setToggle(!toggle)}
              className="nav-toggle text-black  items-center flex pt-[5px] md:text-[24px] text-[20px] ">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
      <aside
        className={
          toggle
            ? "w-[60%] h-screen border-l border-gray-500 lg:w-[20%] pb-8  lg:h-screen fixed top-[0px] right-0 transition-all duration-700 bg-gray-100 z-[999999]"
            : "w-[60%] h-screen border-l border-gray-500 lg:w-[20%] pb-8  lg:h-screen fixed top-[0px] right-[-100%] transition-all duration-700 bg-gray-100 z-[999999]"
        }>
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute top-[15px] left-[20px]">
          <i className="fa-solid fa-x"></i>
        </button>
        <div className=" flex flex-col justify-between items-center h-[100%] w-full pt-10">
          <ul className="flex flex-col items-center py-7 gap-3 w-full">
            <Link
              to={"/"}
              className="nav-item w-full lg:hidden hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              home
            </Link>

            <Link
              to={"/shop"}
              className="nav-item w-full lg:hidden hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Shop
            </Link>
            <Link
              to={"/categories"}
              className="nav-item w-full lg:hidden hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Categories
            </Link>
            <Link
              href="#"
              className="nav-item w-full lg:hidden hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Offers
            </Link>
            <Link
              href="#"
              className="nav-item w-full lg:hidden hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Support
            </Link>
           
            <Link
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
             <i className="fa-solid fa-gear me-1"></i>  Settenig
            </Link>
          </ul>
          <div className="btns-group w-full flex flex-col  items-center justify-center gap-5">
            {!localStorage.getItem("userToken") && (
              <Link
                className="bg-black text-white  text-center text-[18px] py-2 flex justify-center items-center hover:text-black hover:bg-transparent border transition-all duration-500 border-transparent  hover:border-black hover:border  w-[80%] rounded-lg"
                to={"/login"}>
                <i className="fa-solid fa-right-to-bracket fa-flip-horizontal me-[10px]"></i>
                Login{" "}
              </Link>
            )}
            {!localStorage.getItem("userToken") && (
              <Link
                className="bg-transparent text-black  text-center text-[18px] py-2 flex justify-center items-center hover:text-white hover:bg-black  transition-all duration-500 border-black  border  w-[80%] rounded-lg"
                to={"/signup"}>
                <i className="fa-solid fa-user me-[9px]"></i>
                Signup
              </Link>
            )}
          </div>
          {localStorage.getItem("userToken") && (
            <button
              onClick={Logout}
              className="nav-item w-[70%] rounded-xl bg-red-700 hover:bg-red-900 text-white transition-all duration-200 text-center text-[18px] py-2">
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
