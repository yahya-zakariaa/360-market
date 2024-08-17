import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [loadingProducts, setLoadingProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { getUserCart, userCart, removeFromCart, updateCart } =
    useContext(CartContext);
  async function handleUpdateItems(id, count) {
    setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    setIsLoading(true);
    try {
      await updateCart(id, count);
    } catch (error) {
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [id]: false }));
      setIsLoading(false);
    }
  }

  async function handleRemoveItems(id) {
    setIsRemoving((prev) => ({ ...prev, [id]: true }));
    try {
      await removeFromCart(id);
    } catch (error) {
    } finally {
      setIsRemoving((prev) => ({ ...prev, [id]: false }));
      toast.success("removed from cart", { position: "top-center" });
    }
  }

  useEffect(() => {
    getUserCart();
  }, [removeFromCart, updateCart]);

    if (userCart.numOfCartItems < 1) {
      return(
        <div className="w-full h-screen flex justify-center items-center flex-col gap-10">
        <h1 className="text-3xl font-bold text-gray-500">Your cart is empty</h1>
        <Link to="/" className="text-[18px] font-bold text-white bg-black rounded-md px-4 py-2">Shop now </Link>
      </div>
      )
    }
  if (!userCart || userCart.length < 1) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    );
  }


  return (
    <div className="relative overflow-x-auto lg:h-screen flex lg:pt-[56px] pt-[100px] flex-col lg:flex-row">
      
       
    
        <table className="lg:w-[80%] w-full text-sm text-left rtl:text-right text-gray-500 shadow-md px-6 overflow-hidden">
          <thead className="text-xs text-black border-b border-gray-200 uppercase bg-white">
            <tr>
              <th scope="col" className="ps-11 py-5 text-[17px]">
                Image
              </th>
              <th scope="col" className="ps-9 py-5 text-[17px]">
                Product Name
              </th>
              <th scope="col" className="ps-12 py-5 text-[17px]">
                Quantity
              </th>
              <th scope="col" className="ps-6 py-5 text-[17px]">
                Price
              </th>
              <th scope="col" className="ps-8 py-5 text-[17px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCart.data &&
              userCart.numOfCartItems > 0 &&
              userCart.data.products.map((cartItem) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={cartItem._id}>
                  <td className="p-4">
                    <img
                      src={cartItem.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={cartItem.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-[17px]">
                    {cartItem.product.title.split(" ").slice(0, 3).join(" ")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() => {
                          handleUpdateItems(
                            cartItem.product.id,
                            cartItem.count - 1
                          );
                        }}>
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div className="relative">
                        {loadingProducts[cartItem.product.id] && (
                          <div className="loading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <i className="fas fa-spinner fa-spin text-black"></i>
                          </div>
                        )}
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 ps-3 border border-gray-300 text-gray-900 text-sm rounded-lg block py-1 text-center"
                          value={
                            loadingProducts[cartItem.product.id]
                              ? ""
                              : cartItem.count
                          }
                          disabled={true}
                          required
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() => {
                          handleUpdateItems(
                            cartItem.product.id,
                            cartItem.count + 1
                          );
                        }}>
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-[17px]">
                    {loadingProducts[cartItem.product.id]
                      ? "calculating..."
                      : "$" + cartItem.price * cartItem.count}
                  </td>
                  <td className="px-6 py-4">
                    {isRemoving[cartItem.product.id] ? (
                      <i className="fas fa-spinner fa-spin fa-2x text-black ms-6"></i>
                    ) : (
                      <button
                        onClick={() => handleRemoveItems(cartItem.product.id)}
                        className="text-red-800 text-[18px] lg:text-[24px] font-bold">
                       <i class="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      
      <div className="lg:border-l lg:border-gray-400 info w-full lg:mt-0 lg:w-[21%] h-[400px] border-t mt-10 border-gray-500 py-6 lg:h-screen bg-white  lg:fixed lg:top-[55px] lg:right-0 flex flex-col justify-between items-center lg:pb-20 lg:pt-10">
        <div className="cart-info w-full px-4">
          <h3 className="text-[25px] font-bold text-center mb-11">
            Cart Details
          </h3>
          <p className="text-[20px] font-simibold mb-2 pb-2 border-b flex justify-between pe-[1px] border-gray-200 lg:border-gray-200">
            <span>Total items:</span>
            <span>
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                userCart.data.products.reduce((a, b) => a + b.count, 0)
              )}
            </span>
          </p>
          <p className="text-[20px] font-simibold flex justify-between items-center">
            <span>Total price: </span>
            <span>
              {isLoading
                ? "calculating..."
                : "$" + userCart.data.totalCartPrice}
            </span>
          </p>
        </div>
        <div className="btnsGroup flex w-full flex-col items-center justify-center gap-6">
          {!userCart.numOfCartItems < 1 && (
            <button className="bg-black hover:bg-gray-900 transition-all duration-500 text-white w-[80%] rounded-lg py-3 text-[20px]">
              Check out
            </button>
          )}
          {!userCart.numOfCartItems < 1 && (
            <button className="bg-transparent  text-black hover:bg-red-700 border-red-700 border hover:text-white transition-all duration-300 w-[60%] rounded-lg py-2 text-[20px]">
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
