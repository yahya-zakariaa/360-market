import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/Wishlist";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function WishList() {
  const { wishlist, getWishlist, removeFormWishList } =
    useContext(WishlistContext);
  const { addToCart, userCart, getUserCart } = useContext(CartContext);
  const [selectedOption, setSelectedOption] = useState("text");
  const [filteredData, setFilteredData] = useState([]);
  const [isRemoveing, setIsRemoveing] = useState(false);
  useEffect(() => {
    getWishlist();
    getUserCart();
  }, []);

  function handleSearchChange(e) {
    setSelectedOption(e.target.value);
  }
  function handleSearchInput(e) {
    if (selectedOption === "text") {
      setFilteredData(
        wishlist.data.filter((item) =>
          item.title
            .toString()
            .toLowerCase()
            .startsWith(e.target.value.toString().toLowerCase())
        )
      );
    } else if (selectedOption === "number") {
      setFilteredData(
        wishlist.data.filter((item) =>
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
    setIsRemoveing((prev) => ({ ...prev, [id]: true }));
    try {
      await removeFormWishList(id).then(() => {
        getWishlist();
      });
    } catch (error) {
    } finally {
      toast.success("Removed from wishlist", { position: "top-center" });
      setIsRemoveing(false);
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
    <div className="relative overflow-x-auto lg:h-screen flex lg:pt-[56px] pt-[50px] flex-col lg:px-10 pb-5">
      <div className="searchBar mx-auto w-full flex items-center justify-center py-10 lg:py-16 border-b border-gray-300 ">
        <input
          type={selectedOption}
          className="lg:w-[30%] w-[60%] h-[40px] border-t border-b border-l border-black rounded-l-full px-3 outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder={`Search ${
            selectedOption == "text" ? "by name" : "by price"
          }`}
          onChange={handleSearchInput}
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

      <table className="w-full   text-sm text-left rtl:text-right text-gray-500 rounded-md shadow-sm overflow-hidden">
        <tbody className="overflow-hidden">
          {filteredData &&
            filteredData.length > 0 &&
            filteredData.map((item) => {
              return (
                <tr className="bg-white border-b overflow-hidden  hover:bg-gray-50 relative">
                  <td className="p-4">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-16 md:w-32 max-w-full max-h-full rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold relative text-gray-900 dark:text-white text-[17px]">
                    {item.priceAfterDiscount && (
                      <p className="text-[14px] lg:text-[18px] absolute left-[0%] top-[20px] lg:top-[55px] font-bold  text-red-800 px-2 py-1 rounded-tl-md">
                        sale
                      </p>
                    )}
                    <Link to={`/product/${item.id}`}>
                      <h4 className="card-title lg:text-[17px] text-[14px] mb-1 hover:underline">
                        {item.title.split(" ").slice(0, 3).join(" ")}
                      </h4>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-[14px] lg:text-[17px]">
                    {item.priceAfterDiscount ? (
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
                        isRemoveing[item.id]
                          ? "text-black text-[18px] lg:text-[24px] font-bold"
                          : "text-red-800 text-[18px] lg:text-[24px] font-bold"
                      }>
                      {isRemoveing[item.id] ? (
                        <i class="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <i class="fa-solid fa-trash-can"></i>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    {userCart?.data?.products.some(
                      (product) => product?.product.id === item.id
                    ) ? (
                      <button
                        disabled
                        className="text-green-600 text-[15px] lg:text-[22px] font-bold">
                        <i class="fa-solid fa-circle-check text-[24px]"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="text-blue-800 text-[18px] lg:text-[24px]  font-bold">
                        <i class="fa-solid fa-cart-plus"></i>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          {wishlist?.data &&
            filteredData.length < 1 &&
            wishlist?.data.map((item) => {
              return (
                <tr className="bg-white border-b overflow-hidden  hover:bg-gray-50 relative">
                  <td className="p-4">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-16 md:w-32 max-w-full max-h-full rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-[17px] relative">
                    {item.priceAfterDiscount && (
                      <p className="text-[14px] lg:text-[18px] absolute left-[0%] top-[20px] lg:top-[55px] font-bold  text-red-800 px-2 py-1 rounded-tl-md">
                        sale
                      </p>
                    )}
                    <Link to={`/product/${item.id}`}>
                      <h4 className="card-title lg:text-[17px] text-[14px] mb-1 hover:underline">
                        {item.title.split(" ").slice(0, 3).join(" ")}
                      </h4>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-[14px] lg:text-[17px]">
                    {item.priceAfterDiscount ? (
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
                        isRemoveing[item.id]
                          ? "text-black text-[18px] lg:text-[24px] font-bold"
                          : "text-red-800 text-[18px] lg:text-[24px] font-bold"
                      }>
                      {isRemoveing[item.id] ? (
                        <i class="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <i class="fa-solid fa-trash-can"></i>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    {userCart?.data?.products.some(
                      (product) => product?.product.id === item.id
                    ) ? (
                      <button
                        disabled
                        className="text-green-600 text-[15px] lg:text-[22px] font-bold">
                        <i class="fa-solid fa-circle-check text-[24px]"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="text-blue-800 text-[18px] lg:text-[24px]  font-bold">
                        <i class="fa-solid fa-cart-plus"></i>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
