import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [homeProducts, setHomeProducts] = useState([]);

  // handel get home products
  async function getHomeProducts() {
    try {
      await axios
        .get("https://ecommerce.routemisr.com/api/v1/products?limit=9")
        .then((response) => {
          setHomeProducts(response.data.data);
          
        })
        .catch((error) => {
          toast.error(error.response.data.message, { position: "top-center" });
        });
    } catch (error) {
    } finally {
      setHomeProducts(response.data.data);
    }
  }

  return (
    <ProductsContext.Provider value={{ getHomeProducts, homeProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
