import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { Link } from "react-router-dom";
const ProductDetailCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  useEffect(() => {
    const initWishlist =
      wishlist?.length > 0 && wishlist.find((i) => i._id === data?._id);
    if (initWishlist) setClick(true);
    else setClick(false);
  }, [wishlist]);

  const handleSubmitMessage = (e) => {
    e.stopPropagation();
  };

  const incrementCount = (e) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };
  const decrementCount = (e) => {
    e.stopPropagation();
    if (count > 1) setCount((prev) => prev - 1);
  };
  const handleAddCart = (id) => {
    const isItemExist = cart.length > 0 && cart.find((i) => i._id === id);

    if (isItemExist) {
      toast.error("Product already in cart", {
        position: "bottom-center",
        theme: "colored",
      });
    } else {
      if (data?.stock < count) {
        toast.error("Product stock limited", {
          position: "bottom-center",
          theme: "colored",
        });
      } else {
        const cartData = { ...data, qty: count };

        dispatch(addToCart(cartData));
        toast.success("Item add to cart successfully", {
          position: "bottom-center",
          theme: "colored",
        });
        setOpen(false);
      }
    }
  };

  const handleClickAddWishlist = (id) => {
    setClick(true);
    const isItemExist =
      wishlist.length > 0 && wishlist.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Product item exist in wishlist", {
        position: "bottom-center",
        theme: "colored",
      });
    } else {
      const dataWishlist = { ...data };
      dispatch(addToWishlist(dataWishlist));
      toast.success("Product item add to wihslist successfully", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  const handleClickRemoveWishlist = () => {
    setClick(false);
    dispatch(removeFromWishlist(data));
    toast.success("Product item remove from wihslist successfully", {
      position: "bottom-center",
      theme: "colored",
    });
  };
  return (
    <div className="bg-white">
      {data ? (
        <div
          className="fixed w-full h-screen top-0 left-0 bg-[rgba(0,0,0,0.7)] z-40 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="detailCard w-[90%] 800px:w-[60%] h-[90vh] 
            overflow-y-auto 800px:h-[75%] bg-white rounded-md shadow-sm relative p-5 mt-20"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <RxCross1
              className="absolute right-3 top-2 z-50"
              size={30}
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex gap-2">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.images[0]}
                  alt=""
                  className="aspect-[1.5/1] object-contain"
                />
                <Link
                  className="flex items-center"
                  to={`/shop/${data?.shopId}`}
                >
                  <img
                    src={data?.shop?.avatar}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name} font-[500]`}>
                      {data?.shop?.name}
                    </h3>
                    <h5 className="font-[500] pb-3 text-[15px]">
                      (4.5) Ratings
                    </h5>
                  </div>
                </Link>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleSubmitMessage}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="font-[500] text-[16px] text-red-500 mt-5">
                  ({data?.sold_out}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data?.name}
                </h1>
                <p className="hidden 800px:block">{data?.description}</p>
                <div className="flex pt-3">
                  <h4 className={styles.productDiscountPrice}>
                    {data?.discountPrice}$
                  </h4>
                  <h3 className={styles.price}>
                    {data?.originalPrice ? data?.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleClickRemoveWishlist()}
                        color={"red"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => handleClickAddWishlist(data?._id)}
                        color={"#333"}
                        title="Remove from wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-10 rounded-[4px] h-11 `}
                >
                  <span
                    className="text-[#fff] flex items-center"
                    onClick={() => handleAddCart(data?._id)}
                  >
                    Add to cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailCard;
