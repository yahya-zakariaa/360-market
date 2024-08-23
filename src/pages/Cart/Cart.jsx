import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [loadingProducts, setLoadingProducts] = useState({});
  const [isRemoving, setIsRemoving] = useState(false);
  const { getUserCart, userCart, removeFromCart, updateCart } =
    useContext(CartContext);
  async function handleUpdateItems(id, count) {
    setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    try {
      await updateCart(id, count).then(() => {
        setLoadingProducts((prev) => ({ ...prev, [id]: false }));
      });
    } catch (error) {}
  }

  async function handleRemoveItems(id) {
    setIsRemoving((prev) => ({ ...prev, [id]: true }));
    try {
      await removeFromCart(id).then(() => {
        setIsRemoving((prev) => ({ ...prev, [id]: false }));
        toast.success("removed from cart", { position: "top-center" });
      });
    } catch (error) {}
  }

  useEffect(() => {
    getUserCart();
  }, [removeFromCart, updateCart]);

  if (userCart.numOfCartItems < 1) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-10">
        <h1 className="text-3xl font-bold text-gray-500">Your cart is empty</h1>
        <Link
          to="/"
          className="text-[18px] font-bold text-white bg-black rounded-md px-4 py-2">
          Shop now{" "}
        </Link>
      </div>
    );
  }
  if (!userCart || userCart.length < 1) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    );
  }

  
  return (
    <section className=" w-full h-auto min-h-screen pt-40">
      <div className="container mx-auto">
        <div className="cart-title bg-black w-[92%] mb-14 py-3 mx-auto md:w-full flex items-center px-5 rounded-lg">
          <h4 className="sm:text-[20px] text-[18px] font-medium text-white">
            <span>{userCart.numOfCartItems}</span> Items
          </h4>

          <h3 className="sm:text-2xl text-xl font-bold text-white  mx-auto text-center">
            Your Cart
          </h3>
          <Link
            className="text-white font-medium sm:text-[20px] text-[18px] flex items-center gap-1"
            to="/">
            Shop <i class="fa-solid fa-angle-right mt-[2px]"></i>
          </Link>
        </div>
        <div className="products-cards-conteiner gap-y-10 border-b border-gray-300  pb-10 flex flex-wrap">
          {userCart.data &&
            userCart?.numOfCartItems > 0 &&
            userCart?.data?.products?.map((cartItem) => (
              <div className="card-paddeing px-5    lg:w-1/4 sm:w-1/2 w-full">
                <div className="product-card flex-col overflow-hidden rounded-md bg-gray-50 border-[1.6px] lg:pb-8 border-gray-300  pb-3  h-[430px] min-h-[450px]">
                  <div className="product-img w-full min-h-[60%] relative">
                    <button className="addToWishlist absolute top-3 right-3 z-10">
                      <i className="fa-regular fa-heart text-[22px]"></i>
                    </button>

                    <Link
                      className="absolute w-full overflow-hidden h-full"
                      to={`/product/${cartItem.product.id}`}>
                      <img
                        src={cartItem?.product?.imageCover}
                        loading="lazy"
                        decoding="async"
                        className="object-cover object-center w-full h-full"
                        alt={`image`}
                      />
                    </Link>
                  </div>
                  <div className="product-details py-4 px-3">
                    <Link
                      to={`/product/${cartItem.product.id}`}
                      href="#"
                      class="   font-bold text-gray-900 hover:underline text-xl ">
                      {cartItem.product.title.split(" ").slice(0, 2).join(" ")}
                    </Link>
                    <div className="subContainer mb-10 flex justify-between items-center mt-5">
                      <p class="text-base font-bold text-gray-900">
                        ${cartItem.price * cartItem.count}
                      </p>
                      <div className="product-quantity">
                        <div class="flex items-center">
                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateItems(
                                cartItem.product.id,
                                cartItem.count - 1
                              );
                            }}
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100">
                            <svg
                              class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
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
                              class="w-10 shrink-0 border-0 ps-[12px] bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              value={
                                loadingProducts[cartItem.product.id]
                                  ? ""
                                  : cartItem.count
                              }
                              disabled={true}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateItems(
                                cartItem.product.id,
                                cartItem.count + 1
                              );
                            }}
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg
                              class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="items-action w-full flex justify-end ">
                      <button
                        disabled={isRemoving[cartItem.product.id]}
                        onClick={() => handleRemoveItems(cartItem.product.id)}
                        className="text-red-700 text-[20px] rounded-md ">
                        {isRemoving[cartItem.product.id] ? (
                          <i class="fa-solid fa-spinner fa-spin text-[19px]"></i>
                        ) : (
                          <i class="fa-solid fa-trash-can text-[20px]"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="cart-summary w-[92%] mx-auto py-20">
          <div className="summary-card px-5 pb-8 pt-6 rounded-lg border w-full lg:w-[40%] md:w-[70%] mx-auto border-gray-300 bg-gray-50">
          <div className="cart-summary-title mb-20">
            <h3 className="text-2xl font-bold text-black  mx-auto text-center">Order Summary</h3>
          </div>
            <div className="total-items flex justify-between items-center mb-3">

              <p className="text-gray-900 font-medium ">Total Products:</p>

            <p className=" text-[18px] font-semibold text-black ">( {userCart.data.products.reduce((e,a)=>{
              
              return (e + a.count)
            },0)} )</p>
            </div>
            <div className="price flex justify-between items-center">
              <p className="text-gray-900 font-medium ">Total Price:</p>

            <p className=" text-[18px] font-semibold text-black "> ${userCart.data.totalCartPrice}</p>
            </div>
            <div className="btn w-full px-3 flex-col gap-2 flex  justify-center items-center mt-24">
              <button className="bg-black text-lg min-w-[100px] rounded-lg text-white text-center mx-auto w-[50%] py-2">Checkout</button>
              <span className="font-bold">Or</span>
              <Link to={"/"} className=" underline">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
