import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  // handel add to wishlist request
  async function addToWishList(id) {
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("userToken")),
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        toast.error(error.response.data.message, { position: "top-center" });
      });
  }

  //     get wishlist
  async function getWishlist() {
    try {
      localStorage.getItem("userToken") &&
        (await axios
          .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
              token: JSON.parse(localStorage.getItem("userToken")),
            },
          })
          .then((response) => {
            setWishlist(response.data);
          })
          .catch((error) => {
            toast.error(error.response.data.message, {
              position: "top-center",
            });
          }));
    } catch (error) {}
  }

  async function removeFormWishList(id) {
    try {
      await axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
          headers: {
            token: JSON.parse(localStorage.getItem("userToken")),
          },
        })
        .then((response) => {})
        .catch((error) => {
          toast.error(error.response.data.message, { position: "top-center" });
        });
    } catch (error) {}
  }

  return (
    <WishlistContext.Provider
      value={{ addToWishList, getWishlist, wishlist, removeFormWishList }}>
      {children}
    </WishlistContext.Provider>
  );
}
