import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };
  const handlerQuantity = (data) => {
    dispatch(addToCart(data));
  };

  const totalPrice =
    cart.length > 0 &&
    cart.reduce((acc, item) => acc + item?.discountPrice * item?.qty, 0);
  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] z-10 h-screen"
      onClick={() => {
        setOpenCart(false);
      }}
    >
      <div
        className="fixed top-0 right-0 h-full 800px:w-[50%] 1000px:w-[30%] w-[60%] bg-white flex flex-col overflow-y-auto detailCard"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {cart.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <RxCross1
              size={25}
              className="cursor-pointer absolute right-5 top-5"
              onClick={() => setOpenCart(false)}
            />

            <span className="font-[400] text-[20px] capitalize">
              Cart product is empty
            </span>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-between items-center pt-5 pr-5 pl-5">
              <div className={`${styles.noramlFlex} `}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart.length > 0 && cart.length} items
                </h5>
              </div>
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>

            {/* cart Single Items */}
            <div className="w-full border-t my-8">
              {cart.length > 0 &&
                cart.map((i) => (
                  <CartSingle
                    key={crypto.randomUUID()}
                    data={i}
                    handlerQuantity={handlerQuantity}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                ))}
            </div>
            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[16px] font-[600]">
                    Checkout Now ({totalPrice}$)
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, handleRemoveFromCart, handlerQuantity }) => {
  const [value, setValue] = useState(data?.qty);
  const totalPrice = data?.discountPrice * value;
  const increment = () => {
    if (value < data?.stock) {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      handlerQuantity(updateCartData);
    } else {
      toast.error("Product stock limited", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  const decrement = () => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    handlerQuantity(updateCartData);
  };
  return (
    <div className="border-b p-4 mb-3">
      <div className="w-full flex items-center gap-2 justify-between">
        <div className="w-[10%] flex flex-col items-center">
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment()}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span>{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement()}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={data?.images[0]}
          alt=""
          className="800px:w-[130px] w-[20%] h-[100px] object-cover ml-2 mr-2 rounded-[5px]  hidden 800px:flex"
        />
        <div className="w-[50%] pl-[5px] justify-self-end">
          <h1 className="800px:text-[15px] text-[14px]">{data.name}</h1>
          <h4 className="font-[400] 800px:text-[15px] text-[14px] text-[#00000082]">
            {data?.discountPrice} * {value} $
          </h4>
          <h4 className="font-[600] 800px:text-[17px] text-[14px] pt-[3px] text-[#d02222] font-Roboto">
            Total: {totalPrice}$
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => handleRemoveFromCart(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
