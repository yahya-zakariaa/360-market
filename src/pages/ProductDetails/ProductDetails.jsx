import axios from "axios";
import { Carousel } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { userToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center ">
        <i class="fa-solid fa-spinner fa-spin fa-3x"></i>
    </div>
  }
  return (
    <div className=" w-full bg-gray-200 p-1 ">
      <Link
        to={"/"}
        className="bg-black mt-5 ml-20 w-fit text-[19px] flex items-center justify-start px-4 py-2 text-white rounded-full">
        <i class="fa-solid fa-arrow-left mr-2 mt-[1px]"></i> back
      </Link>
      <div className="product-details lg:flex-row flex-col flex w-full justify-between px-10 lg:px-20 py-9">
        <div className="img-slider lg:w-[40%] w-[100%] h-[400px] lg:h-[550px] rounded-2xl shadow-lg overflow-hidden">
          <Carousel
            className=" w-full mx-auto h-full slide1r overflow-hidden"
            navigation={false}
            loop={true}>
            {product.images &&
              product.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`image ${index + 1}`}
                  />
                );
              })}
          </Carousel>
        </div>
        <div className="product-info lg:w-[50%] w-[100%] pt-10">
          <h1 className="product-title font-bold text-[23px] lg:text-[30px] mb-3">
            {product.title}
          </h1>
          <p className="product-description text-balance text-gray-600 mb-10">
            {product.description}
          </p>
          <div className="price flex justify-between items-center lg:pr-36">
            <p className="">
              <span className="text-[18px] font-bold me-2">Rateing:</span>
              <i class="fa-solid fa-star me-1 text-yellow-600 text-[16px] font-light"></i>
              {product.ratingsAverage} ({product.ratingsQuantity})
            </p>
            {product.priceAfterDiscount ? (
              <p className="card-price flex items-center text-[24px] font-bold ">
                <span className="text-[18px] me-2 font-bold">Price:</span>$
                {product.priceAfterDiscount}
                <s className="text-gray-600 text-[17px] ms-1  font-medium mt-2 ">
                  {" "}
                  ${product.price}
                </s>
              </p>
            ) : (
              <p>${product.price}</p>
            )}
          </div>
          <div className="btnsActions mt-16 w-full flex gap-10 items-center">
            <button
              className="bg-black w-[60%] py-3 text-center text-white text-[19px] rounded-md"
              onClick={() => {
                userToken
                  ? toast.success("Added to cart", { duration: 4000 })
                  : toast.error("Please login first", { duration: 4000 });
              }}>
              Add to cart
            </button>
            <button
              onClick={(e) => {
                userToken
                  ? toast.success("Added to Fivorites", { duration: 4000 })
                  : toast.error("Please login first", { duration: 4000 });
                e.currentTarget.innerHTML =
                  '<i class="fa-solid fa-heart text-red-700"></i>';
              }}
              className=" text-[25px]  z-30">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
