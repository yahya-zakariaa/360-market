import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../../Context/CheckoutContext";
import { CartContext } from "../../Context/CartContext";
import { useFormik } from "formik";

export default function Checkout() {
  const { createCheckoutSession } = useContext(CheckoutContext);
  const { getUserCart, userCart } = useContext(CartContext);
  const [IsLoading, setIsLoading] = useState(false);
  async function handelCheckout(values) {
    await getUserCart();
    setIsLoading(true);
    const cartId = userCart.cartId;

    const response = await createCheckoutSession(cartId, values);
    setIsLoading(false);
    if (response.status === 200) {
      console.log(response.data.session.url);
      window.location.href = response.data.session.url;
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handelCheckout,
  });

  return (
    <section className="min-h-screen flex justify-center items-center">
      <form class="max-w-sm mx-auto w-[60%]" onSubmit={formik.handleSubmit}>
        <div class="mb-5">
          <label
            for="details"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your details
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            name="details"
            type="text"
            id="details"
            class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your address details"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="phone"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your phone
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            placeholder="Your phone"
            name="phone"
            type="tel"
            id="phone"
            class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-5">
          <label
            name="city"
            for="City"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your City
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            placeholder="Your City"
            name="city"
            type="text"
            id="City"
            class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          disabled={IsLoading}
          type="submit"
          class="text-white mt-6 bg-black focus:outline-none font-medium rounded-lg  w-full px-5 py-2 text-xl text-center  ">
          {IsLoading ? <i className="fas fa-spinner fa-pulse"></i> : "Checkout"}
        </button>
      </form>
    </section>
  );
}
