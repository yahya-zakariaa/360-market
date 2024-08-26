import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [homeProducts, setHomeProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // handel get home products
  async function getHomeProducts() {
    try {
      await axios
        .get("https://ecommerce.routemisr.com/api/v1/products?limit=10")
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
  // handel get all products
  async function getAllProducts() {
    try {
      return await axios
        .get("https://ecommerce.routemisr.com/api/v1/products")
        .then((response) => response)
        .catch((error) => {
          toast.error(error.response.data.message, { position: "top-center" });
        });
    } catch (error) {}
  }
  // handel get product details
  async function getProductDetails(id) {
    try {
      await axios
        .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then((response) => {
          setProductDetails(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message, { position: "top-center" });
        });
    } catch (error) {}
  }

  return (
    <ProductsContext.Provider
      value={{
        getHomeProducts,
        homeProducts,
        getAllProducts,
        allProducts,
        getProductDetails,
        productDetails,

        relatedProducts,
      }}>
      {children}
    </ProductsContext.Provider>
  );
}
