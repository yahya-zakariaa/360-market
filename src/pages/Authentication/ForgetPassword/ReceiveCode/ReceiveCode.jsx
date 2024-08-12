import React, { useContext, useState } from "react";
import "../../Css/login-signup.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { isReceiveCodeContext } from "../../../../Context/receiveCodeStatus";
export default function ReceiveCode() {
    const [forgetPassowrdCodeError , setForgetPassowrdCodeError] = useState(false)
   const receiveCodeStatus = useContext(isReceiveCodeContext)
   const Navigate = useNavigate()
  async function receiveCodeReq(data) {
    data = { resetCode: data.resetCode.toString() };
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data)
      .then((response) => {
        console.log(response);

        if (response.status == 200) {
            receiveCodeStatus.setIsReceiveCode(true)
            Navigate("/login/reset-password")
        }
      })
      .catch((error) => {
        setForgetPassowrdCodeError(true);
        console.log(error);
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: receiveCodeReq,
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        class="max-w-[95%] lg:w-[50%] forgetPassowrdForm h-fit rounded-xl shadow-2xl bg-opacity-85 px-20 py-5 relative bg-white flex items-center justify-center flex-col">
        <div className="title mb-10">
          <h1 className="text-[25px]">Enter your Code</h1>
        </div>
        <div class="mb-8 w-full flex flex-col items-center">
          <input
            maxLength={6}
            onKeyUp={(e) => {
              e.preventDefault();
              if (e.target.value.length == 6) {
                formik.handleSubmit();
              } else {
                return;
              }
            }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="resetCode"
            value={formik.values.resetCode || ""}
            type="number"
            id="resetCode"
            class=" bg-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-gray-600 py-4 px-4 text-center placeholder:text-center rounded-lg outline-none focus:shadow-md transition-all duration-500"
            placeholder="Enter your Code"
          />
          {forgetPassowrdCodeError &&
            setTimeout(() => setForgetPassowrdCodeError(false), 7000) && (
              <p className="text-red-500 text-[15px] pt-3">Invalid Code</p>
            )}
        </div>
        <Link className="underline" to={"/login"}>
          Back to Login
        </Link>
      </form>
    </>
  );
}
