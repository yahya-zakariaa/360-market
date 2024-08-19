import React from "react";
import Skeleton from "react-loading-skeleton";

export default function WishListSkelton() {
  return (
    <div className="relative overflow-x-auto  flex w-full h-screen  flex-col pb-3 pt-32">
      <div className="wishListDetails w-full flex flex-col border-b border-gray-300">
        <div className="searchBar mx-auto w-full  flex items-center justify-center py-10 lg:py-12  ">
          <Skeleton height={40} width={400} className="rounded-full"/>
        </div>
        <div className="wishlistCount px-10 pb-5">
          <Skeleton height={20} width={100} />
        </div>
      </div>

      <table className="w-full   text-sm text-left rtl:text-right text-gray-500 rounded-md shadow-sm overflow-hidden">
        <tbody className="overflow-hidden">
          {Array(5)
            .fill(1)
            .map((_, index) => {
              return (
                <tr className="bg-white border-b overflow-hidden  hover:bg-gray-50 relative">
                  <td className="p-4">
                    <Skeleton height={180} width={130} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-[17px] relative">
                    <Skeleton height={10} width={150} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-[14px] lg:text-[17px]">
                    <Skeleton height={10} width={70} />
                  </td>
                  <td className="px-6 py-4 ">
                    <Skeleton height={40} width={40} className="rounded-full" />
                  </td>
                  <td className="px-6 py-4 ">
                    <Skeleton height={40} width={40} className="rounded-full" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
