import React, { useState, useContext } from "react";
import "../../Css/login-signup.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isReceiveCodeContext } from "../../../../Context/receiveCodeStatus";
export default function ResetPassword() {
  const userEmail = useContext(isReceiveCodeContext);
  const Navigate = useNavigate();

  async function newPassword(data) {
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
      .then((response) => {
        localStorage.setItem("userToken", response.data.token);
        userEmail.setIsReceiveCode(false);
        Navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      email: userEmail.userEmail,
      newPassword: "",
    },
    onSubmit: newPassword,
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        class="lg:w-[50%] w-[95%] forgetPassowrdForm h-fit rounded-xl shadow-2xl bg-opacity-85 px-20 py-5 relative bg-white flex items-center justify-center flex-col">
        <div className="title mb-14">
          <h1 className="text-[25px]">Reset Your Password</h1>
        </div>
        <div class="mb-6 w-full ">
          <label
            for="newPassword"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="newPassword"
            value={formik.values.newPassword}
            type="text"
            id="newPassword"
            class="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%] transition-all duration-300 mb-9"
            placeholder="Enter Your New Password"
          />
          <label
            for="re-newPassword"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            re-Enter Password
          </label>
          <input
            type="text"
            id="re-newPassword"
            class="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%] transition-all duration-300 mb-4"
            placeholder="re-Enter Your New Password"
          />
        </div>

        <div className="btnsGroup flex gap-5 justify-start w-full mb-8">
          <button
            disabled={formik.isSubmitting}
            type="submit"
            class="text-white bg-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {formik.isSubmitting ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Reset"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
