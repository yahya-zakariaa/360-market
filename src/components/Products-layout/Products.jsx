import { Carousel } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ProductsContext } from "../../Context/productsContext";
import { UserContext } from "../../Context/UserContext";
import { WishlistContext } from "../../Context/Wishlist";

export default function Products() {
  const { addToCart, userCart, getUserCart } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const { addToWishList, wishlist, getWishlist } = useContext(WishlistContext);
  const { getHomeProducts, homeProducts } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

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
  localStorage.getItem("userToken") &&
    // get products will component mount
    useEffect(() => {
      getWishlistAndCart();
    }, []);
  // handel get products
  async function getProducts() {
    try {
      await getHomeProducts();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  // get products will component mount
  useEffect(() => {
    getProducts();
  }, []);

  console.log(homeProducts);

  // handel add to cart
  async function HandelAddToCart(productId) {
    if (userToken) {
      await addToCart(productId).then(() => {
        getUserCart().then(() => {
          toast.success("Added to cart", {
            position: "top-center",
          });
        });
      });
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
            position: "top-center",
          });
        });
      });
    } else {
      toast.error("Please login first", { duration: 4000 });
    }
  }

  // handel request is loading
  if (isLoading) {
    return (
      <>
        {Array(9)
          .fill(0)
          .map((item) => (
            <div className="product-container px-5 lg:w-1/3 md:w-1/2 sm:w-full">
              <div className="product-card shadow-xl group w-[400px] bg-gray-100 rounded-xl overflow-hiddentransition-all duration-300">
                <div className="card-img relative w-full p-0 h-[450px] overflow-hidden">
                  <Skeleton height={"100%"} width={"100%"} />
                </div>
                <div className="card-body px-3 py-5 h-[180px]">
                  <Skeleton height={10} width={100} count={2} />
                  <div className="product-rateing my-[3px]">
                    <Skeleton width={100} />
                  </div>
                  <div className="card-footer flex justify-between items-center">
                    <Skeleton width={100} height={30} />
                    <Skeleton circle width={50} height={50} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }

  return (
    <>
      {homeProducts.map((item) => {
        const isInWishlist = wishlist?.data?.some(
          (wishlistItem) => wishlistItem.id === item.id
        );
        const isInCart = userCart?.data?.products?.some(
          (cartItem) => cartItem.product.id === item.id
        );

        return (
          <div className="card-container px-5 lg:w-1/3 md:w-1/2 sm:w-full">
            <div
              className="product-card shadow-xl group bg-gray-100 rounded-xl overflow-hidden w-full  transition-all duration-300"
              key={item.id}>
              <div className="card-img relative flex items-center justify-center w-full p-0 h-[450px] overflow-hidden">
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
                {imageLoading[item?.id] ? (
                  <Skeleton width={430} height={450} />
                ) : (
                  <Carousel
                    className="w-full mx-auto h-full slider overflow-hidden"
                    navigation={false}
                    loop={true}>
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        onLoad={() =>
                          setImageLoading((prev) => ({
                            ...prev,
                            [item.id]: false,
                          }))
                        }
                        onError={() =>
                          setImageLoading((prev) => ({
                            ...prev,
                            [item.id]: false,
                          }))
                        }
                        className="object-cover w-full h-full"
                        alt={`image ${index + 1}`}
                      />
                    ))}
                  </Carousel>
                )}
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
                    className="  text-[35px] mr-4   flex justify-center items-center">
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
