import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Context/productsContext";
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Shop() {
  const { getAllProducts, allProducts } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        await getAllProducts();
      } catch (error) {
      } finally {
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);
  console.log(products);

  return (
    <div className="shop-layout flex  flex-col h-screen pt-36">
      <div className="sideBar w-full bg-black h-[300px] ">
        aslka
      </div>
      <div className="content w-full  ms-auto">
        <div className="container overflow-auto w-[98%] mx-auto gap-y-14 py-14 flex flex-wrap">
          {products?.data?.map((item) => (
            <div className="card-container px-5 lg:w-1/3 md:w-1/2 sm:w-full">
              <div
                className="product-card shadow-xl group bg-gray-100 rounded-xl overflow-hidden w-full  transition-all duration-300"
                key={item.id}>
                <div className="card-img relative flex items-center justify-center w-full p-0 h-[450px] overflow-hidden">
                  <button
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

                  <Carousel
                    className="w-full mx-auto h-full  overflow-hidden"
                    navigation={false}
                    loop={true}>
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className="object-cover w-full h-full"
                        alt={`image ${index + 1}`}
                      />
                    ))}
                  </Carousel>
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
          ))}
        </div>
      </div>
    </div>
  );
}
