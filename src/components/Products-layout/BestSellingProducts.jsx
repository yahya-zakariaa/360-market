import { Carousel } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ProductsContext } from "../../Context/productsContext";
import { UserContext } from "../../Context/UserContext";
import { WishlistContext } from "../../Context/Wishlist";
import SkeltonProducts from "./SkeltonProducts";

export default function BestSellingProducts() {
  const { addToCart, userCart, getUserCart } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const { addToWishList, wishlist, getWishlist } = useContext(WishlistContext);
  const { getHomeProducts, homeProducts , getAllProducts} = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  //  handel get user cart && wishlist if have token
  async function getWishlistAndCart() {
    setIsLoading(true);
    try {
      await getWishlist();
      await getUserCart();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  // get wishlist && cart will component mount (if have token)
  useEffect(() => {
    localStorage.getItem("userToken") && getWishlistAndCart();
  }, []);
  // handel get products
  async function getProducts() {
    try {
     const res = await getAllProducts();
     console.log(res);
     
     setProducts(res.data.data.filter((product) => product.sold > 100).slice(0, 4));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  // get products will component mount
  useEffect(() => {
    getProducts();
  }, []);

  // handel add to cart
  async function HandelAddToCart(productId) {
    if (userToken) {
      try {
        await addToCart(productId);
        await getUserCart();
      } catch (err) {
      } finally {
        toast.success("Added to cart", {
          position: "top-right",
        });
      }
    } else {
      toast.error("Please login first", { duration: 4000 });
    }
  }

  // handel add to wishlist
  async function HandelAddToWishList(id) {
    if (userToken) {
      await addToWishList(id).then(() => {
        getWishlist().then(() => {
          toast.success("Added to wishlist", {
            position: "top-right",
          });
        });
      });
    } else {
      toast.error("Please login first", { duration: 4000 });
    }
  }

  // handel request is loading
  if (isLoading) {
    return <SkeltonProducts />;
  }

  return (
    <>
      {products.map((item) => {
        const isInWishlist = wishlist?.data?.some(
          (wishlistItem) => wishlistItem.id === item.id
        );
        const isInCart = userCart?.data?.products?.some(
          (cartItem) => cartItem.product.id === item.id
        );

        return (
          <div
            key={item.id}
            className="card-container  px-3 lg:px-3 lg:w-1/4 md:w-1/3 w-full sm:w-1/2">
            <div className="product-card border border-gray-400  group bg-gray-100 rounded-xl overflow-hidden w-full  transition-all duration-300">
              <div className="card-img relative flex items-center justify-center w-full p-0 sm:h-[30%] h-[40%] overflow-hidden">
                <button
                  disabled={isInWishlist}
                  onClick={(e) => {
                    HandelAddToWishList(item.id);
                    e.stopPropagation();
                  }}
                  className={`absolute top-4 text-[25px] right-4 z-30 ${
                    isInWishlist ? "text-red-700" : ""
                  }`}>
                  {isInWishlist ? (
                    <i class="fa-solid fa-heart"></i>
                  ) : (
                    <i class="fa-regular fa-heart"></i>
                  )}
                </button>

                {item.priceAfterDiscount && (
                  <div className="bg-red-700 z-50 w-[125px] h-[40px] absolute top-[10px] left-[-35px] rotate-[-45deg] flex justify-center items-center text-white">
                    Sale
                  </div>
                )}
                {
                  <Carousel
                    className="w-full mx-auto h-full slider overflow-hidden"
                    navigation={false}
                    loop={true}>
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        onLoad={() => {
                          setIsLoading(false);
                        }}
                        decoding="async"
                        className="object-cover w-full h-full"
                        alt={`image ${index + 1}`}
                      />
                    ))}
                  </Carousel>
                }
              </div>
              <div className="card-body px-3 py-5 h-[180px]">
                <h2 className="card-category mb-1 hover:underline text-blue-700 ">
                  {item.category.name}
                </h2>
                <Link to={`/product/${item.id}`}>
                  <h2 className="card-title mb-1 hover:underline">
                    {item.title ? (
                      item.title.split(" ").slice(0, 4).join(" ")
                    ) : (
                      <Skeleton width={200} />
                    )}
                  </h2>
                </Link>
                <div className="product-rateing my-[3px]">
                  <p>
                    <i class="fa-solid fa-star me-1 text-yellow-600"></i>
                    {item.ratingsAverage} ( {item.ratingsQuantity})
                  </p>
                </div>
                <div className="card-footer flex justify-between items-center">
                  {item.priceAfterDiscount ? (
                    <p className="card-price flex items-center text-lg font-bold">
                      ${item.priceAfterDiscount}
                      <s className="text-gray-600 text-sm ms-1  font-normal ">
                        {" "}
                        ${item.price}
                      </s>
                    </p>
                  ) : (
                    <p>${item.price}</p>
                  )}
                  <button
                    disabled={isInCart}
                    onClick={(e) => {
                      HandelAddToCart(item.id);
                      e.stopPropagation();
                    }}
                    className=" text-[25px] lg:text-[35px] mr-4   flex justify-center items-center">
                    {isInCart ? (
                      <i class="fa-solid fa-circle-check"></i>
                    ) : (
                      <i class="fa-solid fa-circle-plus"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
