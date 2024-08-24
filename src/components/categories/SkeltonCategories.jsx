import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeltonCategories() {
  return (
    <>
      <div className="card w-full   lg:h-[250px] h-64 rounded-xl overflow-hidden relative flex justify-center items-center" >
        <Skeleton width={"100%"} height={"100%"} />
      </div>
    </>
  );
}
