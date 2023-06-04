import React, { useState } from "react";
import { DashboardHeader, DashboardSideBar } from "../../components";

const AdminDashboardPage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <DashboardHeader></DashboardHeader>
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={active}></DashboardSideBar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
