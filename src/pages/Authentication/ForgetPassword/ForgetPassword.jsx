import React, { useContext, useState } from "react";
import "../Css/login-signup.css";
import {useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { isReceiveCodeContext } from "../../../Context/receiveCodeStatus";
import ReceiveCode from "./ReceiveCode/ReceiveCode";
export default function ForgetPassword() {
  const [IsLoading, setIsLoading] = useState(false);
  const [resetCode , setResetCode] = useState(false)
  const setUserEmail = useContext(isReceiveCodeContext)
  const [forgetPassowrdError, setForgetPassowrdError] = useState({
    msg: "",
    status: false,
  });

  async function forgetPasswordReq(data) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
      .then((response) => {
        setIsLoading(false);
        if (response.data.statusMsg == "success") {
          setUserEmail.setUserEmail(data.email)
          setResetCode(true)
        }
        console.log(response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);

        setForgetPassowrdError({
          msg: error.response.data.message,
          status: true,
        });
      });
  }
  const formikForgetPassword = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPasswordReq,
  });
  return (
    <>
     {!resetCode ? (
      <form
      onSubmit={formikForgetPassword.handleSubmit}
      className="w-[50%] forgetPassowrdForm h-fit rounded-xl shadow-2xl bg-opacity-85 px-20 py-5 relative bg-white flex items-center justify-center flex-col">
      <div className="title mb-14">
        <h1 className="text-[25px]">Forget Password?</h1>
      </div>
      <div className="mb-6 w-full ">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
        </label>
        <input
          onBlur={formikForgetPassword.handleBlur}
          onChange={formikForgetPassword.handleChange}
          name="email"
          value={formikForgetPassword.values.email}
          type="text"
          id="email"
          className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%] transition-all duration-300"
          placeholder="name@gmail.com"
        />
        {forgetPassowrdError.status &&
          setTimeout(
            () => setForgetPassowrdError({ msg: "", status: false }),
            7000
          ) && (
            <p className="text-red-500 text-[12px] mt-1">
              {forgetPassowrdError.msg}
            </p>
          )}
      </div>

      <div className="btnsGroup flex gap-5 justify-start w-full mb-14">
        <button
          disabled={IsLoading}
          type="submit"
          className="text-white bg-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          {IsLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
        </button>

        <Link
          to={"/login"}
          className="text-black bg-transparent border border-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Cancel
        </Link>
      </div>
      <div className="forgetPasswordSteps w-full flex flex-col items-start gap-4 mb-4">
        <p>1-- Enter your email </p>
        <p>2-- you will receive a code on your email</p>
        <p>3-- Enter the code</p>
        <p>4-- Reset your password</p>
      </div>
    </form>
     ):<ReceiveCode/>}
    </>
  );
}
