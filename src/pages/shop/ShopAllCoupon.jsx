import React from "react";
import { DashboardHeader, AllCoupon, ShopSideBar } from "../../components";

const ShopAllCoupon = () => {
  return (
    <div className="overflow-x-hidden">
      <DashboardHeader />
      <div className="w-full flex jistify-between h-full relative">
        <ShopSideBar active={9} />
        <div className="w-full 800px:ml-[300px] ml-[50px] flex justify-center">
          <AllCoupon />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupon;
