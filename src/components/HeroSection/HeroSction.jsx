import React from "react";
import slider1 from "../../assets/slider-1.jpg";
import slider2 from "../../assets/slider-2.jpg";
import slider3 from "../../assets/slider-3.jpg";
export default function HeroSction() {
  return (
    <div className="hero-section lg:gap-0 gap-y-5   flex flex-col lg:flex-row justify-between items-start h-full w-full p-5">
      <div className="left-side lg:w-[60%] relative h-full">
        <div className="left-side-content absolute top-[10%] left-[30px] ">
          <h1 className="lg:text-5xl text-2xl font-bold mb-5">
            Sale Up To <span className="text-red-500">50%</span> off
          </h1>
          <p className="text-xl font-bold">
            <span className="text-red-700   ">Don't</span> Miss Out
          </p>

          <button className="btn mt-5 lg:mt-10  transition-all duration-300 font-bold lg:text-xl text-black hover:text-white hover:bg-black  border-2 border-black px-5 py-2 rounded-full">
            Check Offers
          </button>
        </div>
        <img width="100%" src={slider1} className="rounded-md" alt="" />
      </div>
      <div className="right-side lg:w-[38%] flex flex-col h-full justify-center items-center ">
        <div className="right-side-top relative">
          <div className="right-side-top-content absolute top-[20%] right-[10px] w-full flex justify-between h-[30%] flex-col items-end  z-20">
            <h1 className="text-2xl  font-bold mb-5  w-[40%]  ">
              New Collection{" "}
              <span className="text-red-700">Available Now !</span>
            </h1>

            <button className="btn  trnsition-all duration-300  font-semibold text-[18px] text-black border-2 border-black hover:text-white hover:bg-black px-7  py-1 rounded-full me-3 lg:me-16">
              Check Out
            </button>
          </div>
          <img width="100%" src={slider2} className="rounded-md" alt="" />
        </div>
        <div className="right-side-bottom h-full">
          <div className="right-side-bottom-content h-full flex justify-center items-start pt-10 lg:pt-20">
            <button className="btn transition-all duration-300  font-semibold text-[18px] text-white bg-black px-7  py-2 rounded-full">
              Go To Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
