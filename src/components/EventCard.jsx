import React from "react";
import styles from "../styles/style";
import {  useNavigate } from "react-router-dom";
import CountDown from "./CountDown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";

const EventCard = ({ data, active }) => {
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCartHandler = (id) => {
    const isItemExist = cart.length > 0 && cart.find((i) => i._id === id);

    if (isItemExist) {
      toast.error("Product already in cart", {
        position: "bottom-center",
        theme: "colored",
      });
    } else {
      const cartData = { ...data, qty: 1 };

      dispatch(addToCart(cartData));
      toast.success("Item add to cart successfully", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };
  const detailHandle = () => {
    const productData = [...products];
    const product = productData.find((i) => i?.name === data?.name);
    if (product) navigate(`/product/${product?._id}`);
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-[70%] lg:-w[50%] m-auto">
        <img src={data?.images[0]} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className="font-bold text-3xl">{data?.name}</h2>
        <p className="font-[400] mt-3">{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[500] text-[17px] text-[#44a55e]">
            {data?.sold_out} sold out
          </span>
        </div>
        <CountDown endDate={data.finishDate} />
        <br />
        <div className="flex items-center">
          <div onClick={detailHandle}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </div>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data?._id)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
