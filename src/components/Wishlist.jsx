import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/style";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromWishlist(data));
    toast.success("Product item remove from wihslist successfully", {
      position: "bottom-center",
      theme: "colored",
    });
  };

  const handleAddToCart = (data) => {
    const isItemExist =
      cart.length > 0 && cart.find((i) => i._id === data?._id);
    if (isItemExist) {
      toast.error("Product item exist in cart", {
        position: "bottom-center",
        theme: "colored",
      });
    } else {
      const dataCart = { ...data, qty: 1 };
      dispatch(addToCart(dataCart));
      toast.success("Product item add to cart successfully", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  const clearAllWishlist = () => {
    dispatch(clearWishlist());
  };
  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] z-10 h-screen"
      onClick={() => {
        setOpenWishlist(false);
      }}
    >
      <div
        className="fixed top-0 right-0 h-full 800px:w-[50%] 1000px:w-[30%] w-[60%] bg-white flex flex-col overflow-y-auto detailCard"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {wishlist.length == 0 ? (
          <div className="flex justify-center items-center h-full">
            <RxCross1
              size={25}
              className="cursor-pointer absolute right-5 top-5"
              onClick={() => setOpenWishlist(false)}
            />
            <span className="text-[18px] capitalize">
              Wishlist product is empty{" "}
            </span>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-between items-center pt-5 pr-5 pl-5">
              <div className={`${styles.noramlFlex} `}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist.length > 0 && wishlist.length} items
                </h5>
              </div>
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>

            {/* cart Single Items */}
            <div className="w-full border-t mt-8">
              {wishlist.length > 0 &&
                wishlist.map((i, index) => (
                  <CartWishlist
                    key={index}
                    data={i}
                    handleAddToCart={handleAddToCart}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>
            <div
              className="px-5 mb-3 cursor-pointer"
              onClick={() => clearAllWishlist()}
            >
              {/* clear wishlist */}
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <h1 className="text-[#fff] text-[16px] font-[600]">
                  Clear Wishlist
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartWishlist = ({ data, handleAddToCart, removeFromCartHandler }) => {
  return (
    <div className="border-b p-4 mb-3">
      <div className="w-full flex items-center gap-2">
        <div className="w-[10%]" onClick={() => removeFromCartHandler(data)}>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[20px] h-[20px] ${styles.noramlFlex} justify-center cursor-pointer`}
          >
            <RxCross1 color="#fff" size={14} />
          </div>
        </div>
        <img
          src={data?.images[0]}
          alt=""
          className="w-[30%] h-[100px] object-cover ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px justify-self-end w-[50%] ">
          <h1 className="800px:text-[16px] text-[14px]">{data.name}</h1>
          <div className="flex pt-3">
            <h4 className={`${styles.productDiscountPrice} !text-[14px] `}>
              {data?.discountPrice}$
            </h4>
            <h3 className={`${styles.price} !text-[14px] `}>
              {data?.originalPrice + "$"}
            </h3>
          </div>
        </div>

        <AiOutlineShoppingCart
          className="cursor-pointer"
          size={20}
          onClick={() => handleAddToCart(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;
