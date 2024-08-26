import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeltonProducts() {
  return Array(4)
    .fill(0)
    .map((item, i) => (
      <div
        key={i}
        className="card-container  px-3 lg:px-3 lg:w-1/4 md:w-1/3 w-full sm:w-1/2">
        <div className="product-card bg-gray-100 rounded-xl overflow-hidden w-full ">
          <div className="card-img relative flex items-center  justify-center w-full p-0 sm:h-[30%]  overflow-hidden">
            <Skeleton height={"300px"} width={"100%"} />
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
