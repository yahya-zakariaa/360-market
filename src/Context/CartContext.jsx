import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [userCart, setUserCart] = useState([]);

  async function getUserCart() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: JSON.parse(localStorage.getItem("userToken")),
          },
        }
      );
      setUserCart(response.data);
    } catch (error) {}
  }

  // handel add to cart request
  async function addToCart(productId) {
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("userToken")),
          },
        }
      )
      .then((response) => {
      })
      .catch((error) => {
        toast.error(error.response.data.message, { position: "top-center" });
      });
  }
  // handel update cart request
  async function updateCart(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("userToken")),
          },
        }
      )
      .then((response) => {})
      .catch((error) => {});
  }

  // handel remove cart request
  async function removeFromCart(productId) {
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("userToken")),
        },
      })
      .then((response) => {})
      .catch((error) => {});
  }
  return (
    <CartContext.Provider
      value={{
        addToCart,
        updateCart,
        removeFromCart,
        userCart,
        getUserCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
