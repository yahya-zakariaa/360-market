import React, { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../Context/CategoriesContext";
import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function CategoriesPageSections({ id, name }) {
  const { getProductInCategory } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);
  const { wishlist, getWishlist } = useContext(CategoriesContext);
  const { userCart, getUserCart } = useContext(CategoriesContext);
  const [IsLoading, setIsLoading] = useState(true);
  async function handelGetProductInCategory(id) {
    try {
      const response = await getProductInCategory(id);
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {}
  }

  //   get wishlist && cart data
  async function handelGetWishlistAndCart() {
    try {
      await getWishlist();
      await getUserCart();
    } catch (error) {}
  }
  useEffect(() => {
    handelGetWishlistAndCart();
  }, []);

  useEffect(() => {
    handelGetProductInCategory(id);
  });
  return (
    <section className=" bg-gray-900 rounded-lg   w-full  py-5 px-5 my-5">
      <div className="title flex justify-between items-center">
        <h1 className=" text-xl font-bold text-white">{name}</h1>
        {!IsLoading && products.length > 0 && (
          <Link to={``} className="text-white font-medium">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        )}
      </div>
      <div className="container">
        {products.length > 0 && (
          <Splide
            options={{
              rewind: true,
              gap: "10px",
              perPage: 3,
              type: "loop",
              autoplay: true,
              interval: 3000,
              breakpoints: {
                1000: {
                  perPage: 4,
                },
                900: {
                  perPage: 2,
                },
                650: {
                  perPage: 1,
                },
              },
            }}
            className=" md:px-10 px-14 py-10 text-black">
            {products.map((item) => {
              const isInWishlist = wishlist?.data?.some(
                (wishlistItem) => wishlistItem.id === item.id
              );
              const isInCart = userCart?.data?.products?.some(
                (cartItem) => cartItem.product.id === item.id
              );

              return (
                <SplideSlide
                  className={
                    "splideSlide px-3 lg:px-3 lg:w-1/4 md:w-1/3 w-full sm:w-1/3"
                  }
                  key={item.id}>
                  <div className="product-card border border-gray-400  group bg-gray-100 rounded-xl overflow-hidden w-full sm:h-[430px]  h-[380px] lg:h-[520px] transition-all duration-300">
                    <div className="card-img relative flex items-center justify-center w-full md:h-[65%] lg:h-[70%] h-[60%] overflow-hidden">
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
                          <i className="fa-solid fa-heart"></i>
                        ) : (
                          <i className="fa-regular fa-heart"></i>
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
                            item.title.split(" ").slice(0, 3).join(" ")
                          ) : (
                            <Skeleton width={200} />
                          )}
                        </h2>
                      </Link>
                      <div className="product-rateing my-[3px]">
                        <p>
                          <i className="fa-solid fa-star me-1 text-yellow-600"></i>
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
                          className=" text-[25px] lg:text-[35px] mr-1   flex justify-center items-center">
                          {isInCart ? (
                            <i className="fa-solid fa-circle-check"></i>
                          ) : (
                            <i className="fa-solid fa-circle-plus"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
        )}
        {products.length === 0 && (
          <div className="w-full h-100px py-10">
            <h1 className="text-center text-white font-bold text-xl ">
              {" "}
              Cooming Soon
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
