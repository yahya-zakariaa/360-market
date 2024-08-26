import React, { useContext, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { CategoriesContext } from "../../Context/CategoriesContext";
import SkeltonCategories from "./SkeltonCategories";
import { Link } from "react-router-dom";

export default function Categories() {
  const { categories, getCategories } = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(true);
  // handel fetch Categories
  async function handelGetCategories() {
    try {
      await getCategories();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  //  fetch categories
  useEffect(() => {
    handelGetCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="container justify-center gap-5 py-10 flex flex-wrap">
        <SkeltonCategories />
      </div>
    );
  }
  return (
    <Splide
      options={{
        rewind: true,
        gap: "10px",
        perPage: 5,
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
      className=" p-20 text-black">
      {categories.map((item) => {
        return (
          <SplideSlide className={"splideSlide lg:w-1/5  w-1/2"} key={item.id}>
            <Link
              to={`/category/${item._id}`}
              className="card hover:scale-[0.98]  transtion-all duration-300 w-full  lg:h-[250px] h-64 rounded-xl overflow-hidden relative flex justify-center items-center"
              key={item.id}>
              <div className="w-full h-full bg-black opacity-40 absolute top-0 left-0 flex justify-center items-center"></div>
              <div className="w-full h-full  z-50 absolute top-0 left-0 flex justify-center items-center">
                <h2 className="text-xl  font-bold text-white">{item.name}</h2>
              </div>
              <img
                loading="lazy"
                src={item.image}
                alt="category img"
                className="w-full h-full object-cover"
              />
            </Link>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
