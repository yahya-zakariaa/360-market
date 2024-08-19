import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeltonCategories() {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <button
        className="card hover:scale-[0.98]  lg:w-1/5  w-1/2 transtion-all duration-300   lg:h-[250px] h-64 rounded-xl overflow-hidden relative flex justify-center items-center"
        key={index}>
        <div className="w-full h-full bg-black opacity-40 absolute top-0 left-0 flex justify-center items-center"></div>
        <div className="w-full h-full  z-50 absolute top-0 left-0 flex justify-center items-center">
          <h2 className="text-xl  font-bold text-white">
            <Skeleton width={200} />
          </h2>
        </div>
        <Skeleton width={300} height={300} />
      </button>
    ));
}
