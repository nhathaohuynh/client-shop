import React from "react";
import Lottie from "lottie-react";
import { Footer } from "../components";
import error from "../assets/120102-404-error-page-with-cat.json";

const ErrorPage = () => {
  return (
    <div>
      <Error />
    </div>
  );
};

const Error = () => {
  return (
    <div className=" mt-10 flex justify-center items-center flex-col">
      <div className="w-[500px] h-[500px] m-auto">
        <Lottie animationData={error} loop={true} autoPlay={true}></Lottie>
      </div>
      <h5 className="font-[500] text-center mb-14 text-[25px] text-[#000000a1]">
        Page not found 😪
      </h5>
      <br />
      <br />
    </div>
  );
};

export default ErrorPage;
