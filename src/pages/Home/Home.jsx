import React from "react";
import Slider from "../../components/Slider/Slider";
import "./home.css";
import Products from "../../components/Products-layout/Products";

export default function Home({ categories, popularProducts }) {
  return (
    <>
      <div id="homePage" className="w-full h-screen">
        <div
          id="homeSec"
          className="home-section flex justify-center items-center w-full h-fit lg:h-screen md:h-screen">
          <Slider />
        </div>
        <div id="ProductsSec" className="Products py-16 ">
          <div className="category-title flex justify-center">
            <h2 className="text-4xl font-bold text-center text-black border-b-4 pb-3 md: border-black inline-block ">
              Men's Clothing Deals
            </h2>
          </div>

          <div className="container mx-auto h-full flex flex-col items-center  pt-12 lg:px-0 md:px-0 sm:px-10 px-7">
            <div className="product flex-wrap flex gap-14 justify-center mb-12">
              {popularProducts == "" ? (
                <div className="w-full h-[300px] flex items-center justify-center  ">
                  <i className="fas fa-spinner fa-spin fa-3x"></i>
                </div>
              ) : (
                <Products products={popularProducts} />
              )}
            </div>

            <button className="goToProducts flex items-center gap-2 z-50 px-1 pb-[2px] my-2 text-center font-bold border-b-2 border-black">
              Go to Shop <i class="fa-solid fa-angle-right mt-[3.3px]"></i>
            </button>
          </div>
        </div>
        <div id="CategoriesSec" className="Categories h-fit pt-12 bg-gray-600 ">
          <div className="category-title flex justify-center">
            <h2 className="text-4xl font-bold text-center text-white border-b-4 pb-3 border-white inline-block ">
              Categories
            </h2>
          </div>
          <div className="container mx-auto h-full  flex-wrap flex gap-10 lg:gap-5 justify-center py-12 px-7 lg:px-0 md:px-7 sm:px-10">
            {categories.map((item) => {
              return (
                <button
                  className="card hover:scale-[0.98]  transtion-all duration-300 lg:w-1/6 md:w-1/3 sm:w-full lg:h-56 h-64 bg-blue-gray-500 rounded-xl overflow-hidden relative flex justify-center items-center"
                  key={item.id}>
                  <div className="w-full h-full bg-black opacity-40 absolute top-0 left-0 flex justify-center items-center"></div>
                  <div className="w-full h-full  z-50 absolute top-0 left-0 flex justify-center items-center">
                    <h2 className="text-xl  font-bold text-white">
                      {item.name}
                    </h2>
                  </div>
                  <img
                    loading="lazy"
                    src={item.image}
                    alt="category img"
                    className="w-full h-full"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
