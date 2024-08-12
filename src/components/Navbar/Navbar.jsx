import React, { useContext, useEffect, useState } from "react";
import "../Navbar/Nav.css";
import { Badge, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const { getUserCart, userCart } = useContext(CartContext);
  const Navigate = useNavigate();

  localStorage.getItem("userToken") &&
    useEffect(() => {
      getUserCart();
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
        className="w-full px-9 lg:px-16 md:px-16 bg-gray-100 py-1 flex fixed top-0 z-[99999] transition-all duration-700 ">
        <div className=" py-2 flex justify-between w-full">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold justify-center"
            to={"/"}>
            <i class="fa-solid fa-circle-nodes text-[30px]"></i>
            <span className="text-black text-[20px]">360 Market</span>
          </Link>
          <ul className=" justify-start items-center w-fit gap-16 hidden lg:flex md:flex">
            <li className="nav-item">
              <Link href="#" className="nav-link text-black" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link text-black ">
                Producets
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

          <div className="nav-actions flex gap-10 items-center  ">
            <Badge
              className="mt-[] me-[-7px] text-[12px] w-[1px] h-[1px] bg-gray-100 text-black"
              content="2">
              <Link
                href="#"
                className="nav-link text-black mt-[2px] text-[24px]  nav-wishlist flex items-center">
                <i class="fa-solid fa-heart"></i>
              </Link>
            </Badge>
            <Badge
              className="mt-[3px] me-[-1px] text-[12px] w-[1px] h-[1px] bg-gray-100 text-black"
              content={userCart?.data?.products?.reduce((a, b) => a + b.count, 0)}>
              <Link
                to={"/cart"}
                className="nav-link text-black mt-[2px]  nav-cart flex items-center">
                <i class="fa-solid fa-bag-shopping"></i>
              </Link>
            </Badge>
            <button
              onClick={() => setToggle(!toggle)}
              className="nav-toggle text-black  items-center flex me-2 text-[25px]  ">
              <i class="fa-solid fa-bars"></i>
            </button>
            {
              !localStorage.getItem("userToken") && (
                <Link
                  className="bg-black text-white flex items-center hover:text-black hover:bg-transparent border transition-all duration-500 border-transparent  hover:border-black hover:border px-5 py-1 rounded-full"
                  to={"/login"}>
                  Login{" "}
                  <i class="fa-solid fa-right-to-bracket fa-flip-horizontal ms-[6px]"></i>
                </Link>
              ) //</div> : (
              //   <button
              //     className="bg-red-700 text-white flex items-center hover:text-red-700 hover:bg-transparent border transition-all duration-500 border-transparent  hover:border-red-700 hover:border px-5 py-1 rounded-full"
              //     onClick={() => Logout()}>
              //     Log out <i class="fa-solid fa-right-to-bracket ms-1 "></i>
              //   </button>
              // )
            }
          </div>
        </div>
      </nav>
      <aside
        className={
          toggle
            ? "w-[40%] h-screen lg:w-[20%]   lg:h-screen fixed top-[55px] right-0 transition-all duration-700 bg-gray-100 z-[9999]"
            : "w-[40%] h-screen lg:w-[20%]   lg:h-screen fixed top-[55px] right-[-50%] transition-all duration-700 bg-gray-100 z-[9999]"
        }>
        <div className=" flex flex-col justify-between items-center h-[90%] w-full">
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
          {userToken && (
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
