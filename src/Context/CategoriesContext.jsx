import axios from "axios";
import { createContext, useState } from "react";

export const CategoriesContext = createContext();

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      await axios
        .get("https://ecommerce.routemisr.com/api/v1/categories")
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, { position: "top-center" });
        });
    } catch (error) {}
  }

  async function getProductInCategory(id) {
    try {
      return axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
        )
        .then((response) => response);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }

  return (
    <CategoriesContext.Provider
      value={{ getCategories, categories, getProductInCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}
