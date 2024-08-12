import React, { useEffect, useState } from "react";
import "../Css/login-signup.css";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });
  async function loginData(data) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((response) => {
        if (
          response.data.user.role == "user" &&
          response.data.message == "success"
        ) {
          localStorage.setItem("userToken", JSON.stringify(response.data.token));
          setTimeout(() => {
            toast.success(`Welcome Back ${response.data.user.name}`, {
              position: "top-center",
            });
          }, 700);
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, { position: "top-center" });
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: loginData,
  });

  return (
    <>
      <div className="FormContainer bg-white w-[96%] lg:w-[50%] h-[70%] lg:h-[80%] rounded-xl shadow-2xl bg-opacity-85 px-12 py-5 z-50 relative">
        <h1 className="text-[30px] font-bold text-center mb-[-30px]">Login</h1>
        <form
          className="h-full flex items-center flex-col justify-center w-full"
          onSubmit={formik.handleSubmit}>
          <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center mb-5">
            <label htmlFor="email" className="mt-[9px] me-3 text-[20px]">
              <i className="fa-solid fa-user"></i>
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              name="email"
              value={formik.values.email}
              id="email"
              className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%]"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center">
            <label htmlFor="password" className="mt-[9px] me-3 text-[20px]">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="text"
              name="password"
              id="password"
              className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%]"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="forgetPassowrd w-[79%] flex justify-end mt-3">
            <Link to={"/login/forget-Password"} className="text-[15px]">
              Forget Password?
            </Link>
          </div>
          <div className="inputContainer flex  w-[80%] mx-auto items-center justify-center mt-14">
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="bg-black text-white w-[80%] rounded-lg py-2 hover:scale-[0.98] transition-all duration-500  font-bold">
              {formik.isSubmitting ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <h1 className="text-[18px] font-bold my-3">Or</h1>
          <div className="inputContainer flex  w-[80%] mx-auto items-center justify-center ">
            <Link
              to={"/signup"}
              className="text-center hover:bg-black hover:text-white text-black border transition-all duration-500 border-black w-[70%] font-bold rounded-lg py-2">
              Create New Account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
