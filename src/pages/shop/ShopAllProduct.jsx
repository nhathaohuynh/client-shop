import React from "react";
import { GetAllProduct, ShopHeader, ShopSideBar } from "../../components";

const ShopAllProduct = () => {
  return (
    <div  className="overflow-x-hidden">
      <ShopHeader></ShopHeader>
      <div className="w-full flex jistify-between h-full relative">
        <ShopSideBar active={3}></ShopSideBar>
        <div className="w-full 800px:ml-[300px] ml-[50px] flex justify-center">
          <GetAllProduct></GetAllProduct>
        </div>
      </div>
    </div>
  );
};

export default ShopAllProduct;
