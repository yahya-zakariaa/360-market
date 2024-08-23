import React from "react";
import slider1 from "../../assets/slider-1.jpg";
import slider2 from "../../assets/slider-2.jpg";
import slider3 from "../../assets/slider-3.jpg";
export default function HeroSction() {
  return (
    <div className="hero-section relative bg-green-500 w-full h-full ">
      <div className="content absolute md:top-20 top-12 left-[7%] w-fit">
        <h3 className="md:text-4xl font-bold sm:text-2xl text-lg">
          Sale Up To <span className="text-red-600">50%</span>{" "}
        </h3>
        <h3 className="md:text-4xl font-bold md:mt-5 lg:ml-36 md:ml-0 text-lg ">
          On <span className="text-red-600">Women's</span> Clothes
        </h3>
        <div className="btn w-full ">
          <button className="bg-black text-[16px] sm:text-xl lg:text-xl md:text-[24px] absolute text-white lg:px-6  w-fit text-nowrap md:px-5 md:py-3 px-4 py-1   rounded-full top-[120%] lg:top-[150%]  md:top-[130%]">
            See Offers
          </button>
        </div>
      </div>
      <img
        src={slider1}
        className=" w-full h-full object-cover object-top"
        alt=" hero section img"
      />
    </div>
  );
}
