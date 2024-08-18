import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/Wishlist";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";


export default function WishList() {
  const { wishlist, getWishlist, removeFormWishList } =
    useContext(WishlistContext);
  const { addToCart, userCart, getUserCart } = useContext(CartContext);
  const [selectedOption, setSelectedOption] = useState("text");
  const [isRemoveing, setIsRemoveing] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [data, setData] = useState([]);
  // get wishlist && cart data
  useEffect(() => {
    getWishlist();
    //get user cart to check if product is in cart or no
    getUserCart();
  }, []);

  useEffect(() => {
    setData(wishlist?.data);
  }, [wishlist]);
  // handel search option
  function handleSearchChange(e) {
    // set selected option cuz search is dependencies on it
    setSelectedOption(e.target.value);
  }
  // handel search input
  function handleSearchInput(e) {
    if (e.target.value == "") {
      setData(wishlist.data);
    }
    if (selectedOption == "text") {
      // search by text
      setData(
        wishlist.data.filter(
          (
            item // filter search by title
          ) =>
            item.title
              .toString()
              .toLowerCase()
              .startsWith(e.target.value.toString().toLowerCase())
        )
      );
    } else if (selectedOption == "number") {
      // search by number
      setData(
        wishlist.data.filter(
          (
            item // filter search by price
          ) =>
            item.priceAfterDiscount
              ? item.priceAfterDiscount
                  .toString()
                  .startsWith(e.target.value.toString())
              : item.price.toString().startsWith(e.target.value.toString())
        )
      );
    }
  }

  // handel remove from wishlist
  async function handelRemoveFromWishList(id) {
    // set is loading on current id
    setIsRemoveing((prev) => ({ ...prev, [id]: true }));
    try {
      await removeFormWishList(id).then(() => {
        // get wishlist to update data => product will be removed from wishlist
        getWishlist();
      });
    } catch (error) {
    } finally {
      // remove is loading on current id & display toast message
      toast.success("Removed from wishlist", { position: "top-center" });
      setIsRemoveing(false);
    }
  }

  // handel add to cart
  async function handelAddToCart(id) {
    // set is loading on current id
    setIsAddingToCart((prev) => ({ ...prev, [id]: true }));
    try {
      await addToCart(id).then(() => {
        getUserCart(); // get user cart to update data => product will be in cart
      });
    } catch (error) {
    } finally {
      // remove loading on current id & display toast message
      setIsAddingToCart((prev) => ({ ...prev, [id]: false }));
      toast.success("Added to cart", { position: "top-center" });
    }
  }
  // handel data is loading
  if (!wishlist?.data) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    );
  }
  // handel wishlist is empty
  if (wishlist?.count === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-10">
        <h1 className="text-3xl font-bold text-gray-500">
          Your wishlist is empty
        </h1>
        <Link
          to="/"
          className="text-[18px] font-bold text-white bg-black rounded-md px-4 py-2">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto  flex  flex-col pb-3">
      <div className="searchBar mx-auto w-full  flex items-center justify-center py-10 lg:py-12 border-b border-gray-300 ">
        <input
          type={selectedOption}
          className="lg:w-[30%] w-[60%] h-[40px] border-t border-b border-l border-black rounded-l-full px-3 outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder={`Search ${
            selectedOption == "text" ? "by name" : "by price"
          }`}
          onKeyUp={handleSearchInput}
        />
        <select
          name=""
          onChange={handleSearchChange}
          value={selectedOption}
          className="h-[40px] px-1   rounded-r-full outline-none border border-black text-[15px] cursor-pointer">
          <option value="text">name</option>
          <option value="number">price</option>
        </select>
      </div>
      {data?.length === 0 && (
        <div className="w-full flex items-center justify-center  py-20 ">
          <h3 className="text-[30px] font-bold ">No Products found</h3>
        </div>
      )}
      <table className="w-full   text-sm text-left rtl:text-right text-gray-500 rounded-md shadow-sm overflow-hidden">
        <tbody className="overflow-hidden">
          {data &&
            data?.map((item) => {
              // check if item is in cart
              const isInCart = userCart?.data?.products.some(
                (product) => product?.product.id === item.id
              );
              return (
                <tr className="bg-white border-b overflow-hidden  hover:bg-gray-50 relative">
                  <td className="p-4">
                    {  (
                      <img
                        src={item?.imageCover}
                        alt={item?.title}
                        loading="lazy"
                        className="w-16 md:w-32 max-w-full max-h-full rounded-md"
                      />
                    )||<Skeleton height={"200px"} width={"200px"} />}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-[17px] relative">
                    {item.priceAfterDiscount && (
                      <p className="text-[14px] lg:text-[18px] absolute left-[0%] top-[20px] lg:top-[55px] font-bold  text-red-800 px-2 py-1 rounded-tl-md">
                        sale
                      </p>
                    )}
                    <Link to={`/product/${item.id}`}>
                      <h4 className="card-title lg:text-[17px] text-[14px] mb-1 hover:underline">
                        {item.title.split(" ").slice(0, 3).join(" ")|| <Skeleton height={20} width={200}/>}
                      </h4>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-[14px] lg:text-[17px]">
                    {item.priceAfterDiscount ? ( // check if item has discount && display (main price) and price after discount
                      <div className="flex gap-2 relative">
                        <h4 className="translate-y-[-3px] lg:text-[17px]">
                          ${item.priceAfterDiscount}
                        </h4>
                        <h4 className="text-gray-700 font-normal text-[12px] lg:text-[14px] line-through">
                          ${item.price}
                        </h4>
                      </div>
                    ) : (
                      <h4>${item.price}</h4>
                    )}
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      onClick={() => handelRemoveFromWishList(item.id)}
                      className={
                        isRemoveing[item.id] // set the class name based on the state
                          ? "text-black text-[18px] lg:text-[24px] font-bold"
                          : "text-red-800 text-[18px] lg:text-[24px] font-bold"
                      }>
                      {isRemoveing[item.id] ? ( // render the spinner if the state is true
                        <i class="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <i class="fa-solid fa-trash-can"></i>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      disabled={isInCart}
                      onClick={() => handelAddToCart(item.id)}
                      className="text-blue-800 text-[18px] lg:text-[24px]  font-bold">
                      {isAddingToCart[item.id] ? ( // render the spinner if the state is true
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : isInCart ? ( // check if item is in cart && render the icon based on the state
                        <i class="fa-solid fa-circle-check text-[24px]"></i>
                      ) : (
                        <i class="fa-solid fa-cart-plus"></i>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
