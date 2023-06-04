import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/36605-shopping-cart.json";

const Loading = () => {
  return (
    <div className="w-[300px] m-auto flex items-center h-screen">
      <LoadingSuccess></LoadingSuccess>
    </div>
  );
};

const LoadingSuccess = () => {
  return <Lottie animationData={loading} loop={true} autoPlay={true}></Lottie>;
};

export default Loading;
