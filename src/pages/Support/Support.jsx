import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Support() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_scby9ym", "template_kcd7xer", form.current, "fnxkqWjyAjY2wd15I")
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section className="w-full h-screen pt-[70px] lg:pt-36">
      <h1 className="text-center text-3xl font-bold mb-16">Get In Touch</h1>
      <form className="max-w-sm mx-auto" ref={form} onSubmit={sendEmail}>
        <div className="mb-5">
          <label
            htmlFor="userName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            name="user_name"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="user_email"
            id="email"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Example@Example.com"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="Message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Message
          </label>
          <textarea
            name="message"
            id="Message"
            cols="30"
            rows="5"
            placeholder="Message"
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-black inline-block hover:bg-transparent hover:text-black border hover:border-black transition-all duration-300 focus:outline-none text-xl rounded-lg w-full px-5 py-2 text-center font-bold dark:hover:bg-black"
        >
          Send
        </button>
      </form>
    </section>
  );
}
