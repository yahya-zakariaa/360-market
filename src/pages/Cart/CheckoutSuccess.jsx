import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <section className="w-full h-screen flex items-center flex-col gap-7 justify-center">
      <div className="text-4xl text-green-500 font-bold">Checkout is Success</div>
      <Link to={"/"} className="text-white bg-black px-5 py-2 font-bold rounded-md">
        Back to Home
      </Link>
    </section>
  );
}
