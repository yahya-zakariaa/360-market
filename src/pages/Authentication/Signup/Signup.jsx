import React, { useState } from "react";
import "../Css/login-signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Signup() {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Must be 4 characters or more")
      .max(20, "Must be 20 characters or less")
      .required("Name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Emil isRequired"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Phone is Required"),
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .max(20, "Must be 20 characters or less")
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("rePassword is Required"),
  });
  async function signUp(data) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((response) => {
        if (response.data.message == "success") {
          toast.success("Signup Successfully", { position: "top-center" });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((error) => {

        toast.error(error.response.data.message, { position: "top-center" });
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: signUp,
  });



  return (
    <>
      <div className="loginSec w-full h-screen relative z-20">
        <div className="container  flex items-center justify-center mx-auto  h-full z-50 relative">
          <div className="FormContainer bg-white w-[50%] h-auto rounded-xl shadow-2xl bg-opacity-85 px-12 py-5 z-50 relative">
            <h1 className="text-[30px] font-bold text-center mt-2 mb-4">
              Sign up
            </h1>
            <form
              className="h-full flex items-center flex-col justify-center"
              onSubmit={formik.handleSubmit}>
              <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center mb-5">
                <label htmlFor="name" className="mt-[9px] me-3 text-[20px]">
                  <i className="fa-solid fa-user"></i>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  name="name"
                  value={formik.values.name}
                  id="name"
                  className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%]"
                  placeholder="Name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                    {formik.errors.name}
                  </span>
                ) : null}
              </div>
              <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center mb-5">
                <label htmlFor="email" className="mt-[9px] me-3 text-[20px]">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="text"
                  name="email"
                  id="email"
                  className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%]"
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>

              <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center mb-5">
                <label
                  htmlFor="phone"
                  className="mt-[9px] me-[11px] text-[20px]">
                  <i className="fa-solid fa-phone"></i>{" "}
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  type="text"
                  name="phone"
                  id="phone"
                  className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%]"
                  placeholder="Phone Number"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                    {formik.errors.phone}
                  </span>
                ) : null}
              </div>
              <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center mb-5">
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
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>
              <div className="inputContainer relative flex  w-[80%] mx-auto items-center justify-center ">
                <label htmlFor="password" className="mt-[9px] me-3 text-[20px]">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  name="rePassword"
                  value={formik.values.rePassword}
                  id="rePassword"
                  className="placeholder:text-gray-600 outline-none bg-transparent border-b-2 border-gray-800 w-[90%]"
                  placeholder="re-Password"
                />
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <span className="absolute text-red-600 bottom-[-20px] left-[38px]">
                    {formik.errors.rePassword}
                  </span>
                ) : null}
              </div>

              <div className="inputContainer flex  w-[80%] mx-auto items-center justify-center mt-14">
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="bg-black text-white w-[80%] rounded-lg py-2 hover:scale-[0.98] transition-all duration-500  font-bold">
                  {formik.isSubmitting ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              <h1 className="text-[18px] font-bold my-3">Or</h1>
              <div className="inputContainer flex  w-[80%] mx-auto items-center justify-center ">
                <Link
                  to={"/login"}
                  className="text-center hover:bg-black hover:text-white text-black border transition-all duration-500 border-black w-[70%] font-bold rounded-lg py-2 mb-6">
                  Already Have Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
