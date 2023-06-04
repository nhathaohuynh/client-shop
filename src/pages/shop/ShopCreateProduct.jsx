import React from "react";
import { CreateProduct, ShopHeader, ShopSideBar } from "../../components";

const ShopCreateProduct = () => {
  return (
    <div>
      <ShopHeader></ShopHeader>
      <div className="w-full flex jistify-between h-full relative">
        <ShopSideBar active={4}></ShopSideBar>
        <div className="w-full 800px:ml-[300px] ml-[100px] flex justify-center">
          <CreateProduct></CreateProduct>
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
