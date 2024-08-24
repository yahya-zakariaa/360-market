import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SekltonHeroSection() {
  return (
    <div className="hero-section lg:gap-0 gap-y-5   flex flex-col lg:flex-row justify-between items-start h-full w-full p-5">
      <div className="left-side w-full relative h-full">
        <Skeleton width={"100%"} height={500} />
      </div>
    </div>
  );
}
