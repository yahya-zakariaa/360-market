import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  async function createCheckoutSession(cartId, data) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}/success`,
        {
            shippingAddress: data
        },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("userToken")),
          },
        }
      )
      .then((response) => response)
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
      });
  }
  return (
    <CheckoutContext.Provider value={{ createCheckoutSession }}>
      {children}
    </CheckoutContext.Provider>
  );
}
