import React from "react";
import { Checkout, CheckoutDetail, Footer, Header } from "../components";

const PaymentPage = () => {
  return (
    <div>
      <Header></Header>
        <Checkout active={2}></Checkout>
        <CheckoutDetail></CheckoutDetail>
      <Footer></Footer>
    </div>
  );
};

export default PaymentPage;
