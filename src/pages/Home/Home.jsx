import React, { lazy, Suspense } from "react";
import "./home.css";
import "@splidejs/react-splide/css";
import SkeltonCategories from "../../components/categories/SkeltonCategories";
import SkeltonProducts from "../../components/Products-layout/SkeltonProducts";
import SekltonHeroSection from "../../components/HeroSection/SekltonHeroSection";

export default function Home() {
  const Categories = React.lazy(() =>
    import("../../components/categories/Categories")
  );
  const Products = React.lazy(() =>
    import("../../components/Products-layout/Products")
  );
  const HeroSection = React.lazy(() =>
    import("../../components/HeroSection/HeroSction")
  );
  return (
    <>
      <div id="homePage" className="w-full h-screen lg:pt-36 pt-20 ">
        <div
          id="homeSec"
          className="home-section flex justify-center items-center w-full  lg:h-screen ">
          <Suspense fallback={<SekltonHeroSection />}>
            <HeroSection />
          </Suspense>
        </div>
        <div
          id="CategoriesSec"
          className="Categories h-fit pt-14 bg-gray-900  ">
          <div className="category-title flex justify-center">
            <h2 className="text-5xl font-bold text-center text-white   inline-block ">
              Categories
            </h2>
          </div>
          <div className="container mx-auto h-full   pb-10 px-2">
            <Suspense fallback={<SkeltonCategories />}>
              <Categories />
            </Suspense>
          </div>
        </div>
        <div id="ProductsSec" className="Products py-16 ">
          <div className="category-title flex justify-start w-full">
            <div className=" container mx-auto h-full w-full lg:px-7 px-5">
              <h2 className="text-2xl font-bold  text-black   inline-block ">
                Special Deals
              </h2>
            </div>
          </div>

          <div className="container mx-auto h-full w-full flex flex-col items-center  pt-12 lg:px-0 px-5">
            <div className="product flex-wrap flex  gap-y-16 justify-center mb-12 w-full">
              <Suspense fallback={<SkeltonProducts />}>
                <Products />
              </Suspense>
            </div>

            <button className="goToProducts flex items-center gap-2 z-50  pb-[1px] my-2 text-center border-b-2 font-bold  border-black">
              See All Offers <i class="fa-solid fa-angle-right mt-[3.1px]"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
