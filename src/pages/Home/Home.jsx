import React, { lazy, Suspense } from "react";
import "./home.css";
import "@splidejs/react-splide/css";
import SkeltonCategories from "../../components/categories/SkeltonCategories";
import SkeltonProducts from "../../components/Products-layout/SkeltonProducts";
import SekltonHeroSection from "../../components/HeroSection/SekltonHeroSection";
import BestSellingProducts from "../../components/Products-layout/BestSellingProducts";
import { Link } from "react-router-dom";

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
  const BestSelling = React.lazy(() =>
    import("../../components/Products-layout/BestSellingProducts")
  );
  return (
    <>
      <div id="homePage" className="w-full h-screen lg:pt-30 pt-[70px] ">
        <div id="homeSec" className="home-sectionw-full relative  lg:h-[90vh] ">
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
          <div className="container mx-auto h-full flex items-center justify-center  pb-10 px-2">
            <Suspense fallback={<SkeltonCategories />}>
              <Categories />
            </Suspense>
          </div>
        </div>
        <div id="ProductsSec" className="Products pt-16 pb-12 border-b">
          <div className="category-title flex justify-start w-full">
            <div className=" container mx-auto flex justify-between items-center h-full w-full lg:px-4 px-8">
              <h2 className="text-xl font-bold  text-black   inline-block ">
                Special Deals
              </h2>
              <Link to={"/offers"} className="goToProducts flex items-center gap-1 z-50  pt-2  text-center   text-[16px]">
                See All Offers{" "}
                <i className="fa-solid fa-angle-right mt-[.5px]"></i>
              </Link>
            </div>
          </div>

          <div className="container mx-auto h-full w-full flex flex-col items-center  pt-10 lg:px-0 px-5">
            <div className="product flex-wrap flex  gap-y-16 justify-center mb-12 w-full ">
              <Suspense fallback={<SkeltonProducts />}>
                <Products />
              </Suspense>
            </div>
          </div>
        </div>
        <div id="ProductsSec" className="Products py-16 ">
          <div className="category-title flex justify-start w-full">
            <div className=" container mx-auto flex justify-between items-center h-full w-full lg:px-4 px-8">
              <h2 className="text-xl font-bold  text-black   inline-block ">
                Best Selling
              </h2>
              <Link to={"/shop"} className="goToProducts flex items-center gap-1 z-50  pt-2  text-center   text-[16px]">
                See All
                <i className="fa-solid fa-angle-right mt-[.5px]"></i>
              </Link>
            </div>
          </div>

          <div className="container mx-auto h-full w-full flex flex-col items-center  pt-10 lg:px-0 px-5">
            <div className="product flex-wrap flex  gap-y-16 justify-center mb-12 w-full ">
              <Suspense fallback={<SkeltonProducts />}>
                <BestSellingProducts />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
