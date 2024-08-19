import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SekltonHeroSection() {
  return (
    <div className="hero-section lg:gap-0 gap-y-5   flex flex-col lg:flex-row justify-between items-start h-full w-full p-5">
      <div className="left-side lg:w-[60%] relative h-full">
        <div className="left-side-content absolute top-[10%] left-[30px] "></div>
        <Skeleton width={"100%"} height={500} />
      </div>
      <div className="right-side lg:w-[38%] flex flex-col h-full justify-center items-center ">
        <div className="right-side-top relative w-full h-full">
          <div className="right-side-top-content absolute top-[20%] right-[10px] w-full flex justify-between h-[30%] flex-col items-end  z-20"></div>
          <Skeleton width={"100%"} height={500} />
        </div>
        <div className="right-side-bottom h-full">
          <div className="right-side-bottom-content h-full flex justify-center items-start pt-10 lg:pt-20"></div>
        </div>
      </div>
    </div>
  );
}
