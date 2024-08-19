import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeltonProducts() {
  return Array(9)
    .fill(0)
    .map((item) => (
      <div className="product-container px-5 lg:w-1/3 md:w-1/2 sm:w-full">
        <div className="product-card shadow-xl group w-[400px] bg-gray-100 rounded-xl overflow-hiddentransition-all duration-300">
          <div className="card-img relative w-full p-0 h-[450px] overflow-hidden">
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <div className="card-body px-3 py-5 h-[180px]">
            <Skeleton height={10} width={100} count={2} />
            <div className="product-rateing my-[3px]">
              <Skeleton width={100} />
            </div>
            <div className="card-footer flex justify-between items-center">
              <Skeleton width={100} height={30} />
              <Skeleton circle width={50} height={50} />
            </div>
          </div>
        </div>
      </div>
    ));
}
