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
    Navigate("/login");
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
            <i class="fa-solid fa-circle-nodes text-[30px]"></i>
            <span className="text-black text-[20px]">360 Market</span>
          </Link>
          <div className="searchBar flex-grow  justify-center relative hidden lg:flex">
            <input className="px-4 py-3 w-[50%] rounded-full outline-none border  border-gray-400" type="text" placeholder="Search for products " />
            <button className="bg-black text-white px-4 py-2 top-[10%] right-[25.6%] absolute rounded-full"><i class="fa-solid fa-magnifying-glass"></i> search</button>
          </div>
          <div className="nav-actions flex gap-8 lg:gap-10 items-center  ">
           <div className="flex items-center gap-8">
           <Badge
              className=" mt-[-2px] me-[-7px] text-[12px] w-[1px] h-[1px] bg-transparent text-black"
              content={wishlist?.count}>
              <Link
                to={"/wishlist"}
                className="nav-link text-black mt-[2px] md:text-[24px] text-[20px]  nav-wishlist flex items-center">
                <i class="fa-solid fa-heart"></i>
              </Link>
            </Badge>
            <Badge
              className="mt-[-2px] me-[-7px] text-[12px] w-[1px] h-[1px] bg-transparent text-black"
              content={userCart?.numOfCartItems}>
              <Link
                to={"/cart"}
                className="nav-link text-black mt-[2px] md:text-[24px] text-[20px]  nav-wishlist flex items-center">
                <i class="fa-solid fa-bag-shopping"></i>
              </Link>
            </Badge>
           </div>
            <button
              onClick={() => setToggle(!toggle)}
              className="nav-toggle text-black  items-center flex pt-[5px] md:text-[24px] text-[20px] ">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
        <div className="nav-links py-4 border-t border-gray-300 hidden lg:flex  justify-center items-center">
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
              <Link href="#" className="nav-link text-black">
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
        </div>
      </nav>
      <aside
        className={
          toggle
            ? "w-[60%] h-screen border-l border-gray-500 lg:w-[20%] pb-8  lg:h-screen fixed top-[0px] right-0 transition-all duration-700 bg-gray-100 z-[999999]"
            : "w-[60%] h-screen border-l border-gray-500 lg:w-[20%] pb-8  lg:h-screen fixed top-[0px] right-[-100%] transition-all duration-700 bg-gray-100 z-[999999]"
        }>
          <button onClick={() => setToggle(!toggle)} className="absolute top-[15px] left-[20px]"><i className="fa-solid fa-x"></i></button>
        <div className=" flex flex-col justify-between items-center h-[100%] w-full pt-10">
          <ul className="flex flex-col items-center py-7 gap-3 w-full">
            <a
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              home
            </a>

            <a
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Products
            </a>
            <a
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Categories
            </a>
            <a
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Offers
            </a>
            <a
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Settenig
            </a>
            <a
              href="#"
              className="nav-item w-full hover:bg-gray-300  transition-all duration-200 text-center text-[18px] py-2">
              Support
            </a>
          </ul>
          <div className="btns-group w-full flex flex-col  items-center justify-center gap-5">
            {!localStorage.getItem("userToken") && (
              <Link
                className="bg-black text-white  text-center text-[18px] py-2 flex justify-center items-center hover:text-black hover:bg-transparent border transition-all duration-500 border-transparent  hover:border-black hover:border  w-[80%] rounded-lg"
                to={"/login"}>
                <i class="fa-solid fa-right-to-bracket fa-flip-horizontal me-[10px]"></i>
                Login{" "}
              </Link>
            )}
            {!localStorage.getItem("userToken") && (
              <Link
                className="bg-transparent text-black  text-center text-[18px] py-2 flex justify-center items-center hover:text-white hover:bg-black  transition-all duration-500 border-black  border  w-[80%] rounded-lg"
                to={"/signup"}>
                <i class="fa-solid fa-user me-[9px]"></i>
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
