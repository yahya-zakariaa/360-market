import { Carousel } from "@material-tailwind/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function Products({ products }) {
  const {addToCart} = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  
  
  return (
    <>
      {products.map((item) => {
        return (
          item.priceAfterDiscount && (
            <div
              className="product-card shadow-xl  group bg-gray-100 rounded-xl overflow-hidden   lg:w-1/4 md:w-1/3 sm:w-full transition-all duration-300 "
              key={item.id}>
              <div className="card-img relative w-full h-[450px] overflow-hidden">
                <button
                  onClick={(e) => {
                    userToken
                      ? toast.success("Added to Fivorites", { duration: 4000, position: "top-center" })
                      : toast.error("Please login first", { duration: 4000, position: "top-center" });
                    e.currentTarget.innerHTML = '<i class="fa-solid fa-heart text-red-700"></i>';
                  }}
                  className="absolute top-4 text-[25px] right-4 z-30">
                  <i class="fa-regular fa-heart"></i>
                </button>
                {item.priceAfterDiscount && (
                  <div className="bg-red-700 z-50 w-[125px] h-[40px] absolute top-[10px] left-[-35px] rotate-[-45deg]  flex justify-center items-center text-white">
                    Sale
                  </div>
                )}
                <Carousel
                  className=" w-full mx-auto h-full slider overflow-hidden"
                  navigation={false}
                  loop={true}>
                  <img loading="lazy" src={item.imageCover} alt="image 1" />

                  {item.images &&
                    item.images.map((image, index) => {
                      return (
                        <img
                          key={index}
                          loading="lazy"
                          src={image}
                          alt={`image ${index + 1}`}
                        />
                      );
                    })}
                </Carousel>
              </div>
              <div className="card-body px-3 py-5 h-[180px]">
                <h2 className="card-category mb-1 hover:underline text-blue-700 ">
                  {item.category.name}
                </h2>
                <Link to={`/product/${item.id}`}>
                  <h2 className="card-title mb-1 hover:underline">
                    {item.title.split(" ").slice(0, 4).join(" ")}
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
                    onClick={() => {
                      localStorage.getItem("userToken")
                        ? addToCart(item.id)
                        : toast.error("Please login first", { duration: 4000 });
                    }}
                    className="  text-[35px] mr-4   flex justify-center items-center">
                    <i class="fa-solid fa-circle-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          )
        );
      })}
    </>
  );
}
