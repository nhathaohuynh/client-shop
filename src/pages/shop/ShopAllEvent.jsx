import React from "react";
import { GetAllEvent, ShopHeader, ShopSideBar } from "../../components";

const ShopAllEvent = () => {
  return (
    <div className="overflow-x-hidden">
      <ShopHeader></ShopHeader>
      <div className="w-full flex jistify-between h-full relative">
        <ShopSideBar active={5}></ShopSideBar>
        <div className="w-full 800px:ml-[300px] ml-[50px] flex justify-center">
          <GetAllEvent></GetAllEvent>
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvent;
