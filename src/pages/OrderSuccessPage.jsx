import React from "react";
import Lottie from "lottie-react";
import { Footer, Header } from "../components";
import success from "../assets/success.json";
import happy from "../assets/85744-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <div>
        <div className="w-[300px] h-[300px] m-auto">
          <Success></Success>
          <Happy></Happy>
        </div>
        <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
          Your order is successful 😍
        </h5>
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

const Success = () => {
  return <Lottie loop={false} animationData={success} autoPlay={true}></Lottie>;
};

const Happy = () => {
  return <Lottie loop={false} animationData={happy} autoPlay={true}></Lottie>;
};

export default OrderSuccessPage;
