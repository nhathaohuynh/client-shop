import React from "react";
import { ShopHeader, ShopSideBar } from "../../components";

const ShopDashBoard = () => {
  return (
    <div>
      <ShopHeader></ShopHeader>
      <div className="w-full flex">
        <div className="flex">
          <div className="800px:w-[330px] w-[80px]">
            <ShopSideBar active={1}></ShopSideBar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashBoard;
