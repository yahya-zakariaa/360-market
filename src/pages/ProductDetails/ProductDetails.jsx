import axios from "axios";
import { Carousel } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
import { ProductsContext } from "../../Context/productsContext";
import RelatedProducts from "./RelatedProducts";
import { WishlistContext } from "../../Context/Wishlist";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const { getProductDetails, productDetails } = useContext(ProductsContext);
  const { userToken } = useContext(UserContext);
  const { getWishlist, wishlist, addToWishList } = useContext(WishlistContext);
  const { getUserCart, userCart, addToCart } = useContext(CartContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // handel add to cart
  async function HandelAddToCart(productId) {
    if (userToken && isInCart === false) {
      await addToCart(productId);
      fetchProductData()
    } else {
      toast.error("Please login to add product to cart", {
        position: "top-right",
      });
    }
  }

  // Fetch product data
  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      await getProductDetails(productId);
      localStorage.getItem("userToken") && (await getUserCart());
      localStorage.getItem("userToken") && (await getWishlist());

      // Fetch related products
    } catch (error) {
      console.error("Failed to fetch product data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if product is in wishlist and cart
  const checkProductInWishlistAndCart = () => {
    // Check if product is in wishlist
    const productInWishlist = wishlist?.data?.some(
      (item) => item.id === productId
    );
    setIsInWishlist(productInWishlist);

    // Check if product is in cart
    const productInCart = userCart?.data?.products?.some(
      (item) => item.product._id == productId
    );
    setIsInCart(productInCart);
  };

  // Get related products
  const getRelatedProducts = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
      );
      setRelatedProducts(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch related products", error);
    }
  };

  // update product data if user changes it
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // fire function to Check if product is in wishlist and cart (on component mount => "isLoading = false") isLoading = false => producet category id is will be fetched
  useEffect(() => {
    if (!isLoading) {
      localStorage.getItem("userToken") && checkProductInWishlistAndCart();
      getRelatedProducts(productDetails.category._id);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
      </div>
    );
  }

  return (
    <section class="py-8 bg-gray-50 md:py-16 dark:bg-gray-900 antialiased">
      <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div class="shrink-0 max-w-md lg:max-w-lg mx-auto h-[400px] lg:h-[400px] overflow-hidden md:h-[400px]">
            <Carousel
              className=" lg:w-[80%] mx-auto h-full slide1r overflow-hidden"
              navigation={false}
              loop={true}>
              {productDetails.images &&
                productDetails.images.map((image, index) => {
                  return (
                    <img
                      key={index}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      src={image}
                      alt={`image ${index + 1}`}
                    />
                  );
                })}
            </Carousel>
          </div>

          <div class="mt-6 sm:mt-8 lg:mt-5 ">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {productDetails.title}
            </h1>
            <div class="mt-4 sm:items-center sm:gap-6 sm:flex ps-1 lg:p-0">
              {productDetails.priceAfterDiscount ? (
                <p className="card-price flex items-center text-[20px] font-bold ">
                  ${productDetails.priceAfterDiscount}
                  <s className="text-gray-600 text-[17px] ms-1  font-medium mt-2 ">
                    {" "}
                    ${productDetails.price}
                  </s>
                </p>
              ) : (
                <p>${productDetails.price}</p>
              )}

              <div class="flex items-center gap-2 mt-2 sm:mt-0">
                <p class="text-sm font-medium leading-none text-gray-500 flex items-center   dark:text-gray-400">
                  <svg
                    className="w-4 h-4 mb-1 me-1 text-yellow-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <span className="me-1">{productDetails.ratingsAverage}</span>(
                  {productDetails.ratingsQuantity})
                </p>
              </div>
            </div>

            <div class="mt-6 items-center  gap-5 flex sm:mt-8 ps-1 lg:p-0">
              <button
                disabled={isInCart}
                onClick={() => {
                  isInCart === false &&
                    userToken &&
                    addToCart(productDetails._id);
                  userToken
                    ? toast.success("Added to cart", { duration: 4000 })
                    : toast.error("Please login first", { duration: 4000 });
                }}
                class="text-white bg-black sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center">
                {isInCart ? (
                  <i class="fa-solid fa-check me-2 text-[18px] "></i>
                ) : (
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                )}
                {isInCart ? "Added to cart" : "Add to cart"}
              </button>
              <button
                disabled={isInWishlist}
                onClick={(e) => {
                  HandelAddToCart(productDetails._id);
                  ger;
                  userToken
                    ? toast.success("Added to Fivorites", { duration: 4000 })
                    : toast.error("Please login first", { duration: 4000 });
                  userToken
                    ? (e.currentTarget.innerHTML =
                        '<i class="fa-solid fa-heart text-red-700 text-2xl"></i>')
                    : "";
                }}
                class="flex items-center justify-center py-2.5   text-sm font-medium text-gray-900 ">
                {isInWishlist ? (
                  <i class="fa-solid fa-heart text-red-700 text-2xl"></i>
                ) : (
                  <i class="fa-regular fa-heart text-2xl"></i>
                )}
              </button>
            </div>

            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p class="mb-6 text-gray-800 dark:text-gray-400">
              {productDetails.description}
            </p>
          </div>
        </div>
        <div className="relatedProducts mt-32">
          <h3 className=" sm:2xl text-[18px] text-center md:text-3xl font-bold">
            Related Products
          </h3>
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </div>
      </div>
    </section>
  );
}
