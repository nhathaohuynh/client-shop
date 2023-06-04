import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import instance from "../../axios";

const ShopInfo = ({ isOwner, seller, total_product }) => {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();

    instance
      .get("/product/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login-shop");
    window.location.reload(true);
  };
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src={seller?.avatar}
            alt=""
            className="w-[150px] h-[150px] object-cover border-[3px] border-red-500 rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{seller?.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          alias quod magni assumenda exercitationem quam, soluta magnam adipisci
          saepe aliquid explicabo! Doloremque alias hic, numquam placeat
          voluptatibus asperiores praesentium aliquid?
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{seller?.adress}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{seller?.phone}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">{total_product}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{seller?.createAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
