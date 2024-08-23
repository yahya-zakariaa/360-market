import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Skeleton from "react-loading-skeleton";
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function RelatedProducts({ products }) {
  return (
    <Splide
      options={{
        rewind: true,
        gap: "20px",
        perPage: 4,
        autoplay: true,
        type: "loop",
        autoplay: true,
        interval: 3000,
        breakpoints: {
          1000: {
            perPage: 3,
          },
          900: {
            perPage: 2,
          },
          700: {
            perPage: 1,
          },
        },
      }}
      className=" px-20 py-10 text-black">
      {products?.map((item) => {
        return (
          <SplideSlide className={"splideSlide lg:w-1/5  w-1/2 py-5"} key={item.id}>
            <div
              className="product-card h-[400px] pb-10 shadow-sm  group bg-gray-100 border-2 border-gray-300 rounded-xl overflow-hidden w-full  transition-all duration-300"
              key={item.id}>
              <div className="card-img relative flex items-center justify-center w-full p-0  h-[60%] overflow-hidden">
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
                      <div className="crop w-full h-full relative">
                        <img
                          key={index}
                          src={image}
                          loading="lazy"
                          decoding="async"
                          className="object-cover w-full  h-full"
                          alt={`image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                }
              </div>
              <div className="card-body px-3 py-5 h-[180px]">
                <h2 className="card-category mb-1 hover:underline text-blue-700 ">
                  {item.category.name}
                </h2>
                <Link
                  to={`/product/${item.id}`}
                  onClick={() => window.scrollTo(0, 0)}>
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
                    <p className="text-lg font-bold">${item.price}</p>
                  )}
                </div>
              </div>
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
