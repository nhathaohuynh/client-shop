import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/style";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailCard from "./ProductDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";

const ProductCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state?.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);

  useEffect(() => {
    const initWishlist =
      wishlist?.length > 0 && wishlist.find((i) => i._id === data?._id);

    if (initWishlist) setClick(true);
    else setClick(false);
  }, [wishlist]);

  const handleAddToCart = (id) => {
    const isItemExist = cart.length > 0 && cart.find((i) => i._id === id);
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
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data?._id}`}>
          <img
            src={data?.images[0]}
            alt=""
            className="w-[90%] h-[50%] object-contain"
          />
        </Link>
        <Link to={`/shop/${data?.shopId}`}>
          <h5 className={styles.shop_name}>{data?.shop?.name}</h5>
        </Link>
        <Link to={`/product/${data?._id}`}>
          <h4 className="pb-3 font-[500]">
            {data?.name?.length > 40
              ? data?.name?.slice(0, 40) + "..."
              : data?.name}
          </h4>

          <div className="flex">
            <AiFillStar color="#f6ba00" className="mr-2 cursor-pointer" />
            <AiFillStar className="mr-2 cursor-pointer" color="#f6ba00" />
            <AiFillStar color="#f6ba00" className="mr-2 cursor-pointer" />
            <AiFillStar color="#f6ba00" className="mr-2 cursor-pointer" />
            <AiOutlineStar color="#f6ba00" className="mr-2 cursor-pointer" />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={styles.productDiscountPrice}>
                {data?.discountPrice ? data?.discountPrice : null}$
              </h5>
              <h4 className={styles.price}>
                {data?.originalPrice ? data?.originalPrice + "$" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out ? data?.sold_out : null} sold
            </span>
          </div>
        </Link>

        {/* slide options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => handleClickRemoveWishlist()}
              color={"red"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => handleClickAddWishlist(data?._id)}
              color={"#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            color={"#333"}
            title="Quick view"
          />
          <AiOutlineShopping
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color={"#444"}
            title="Add to cart"
            onClick={() => handleAddToCart(data?._id)}
          />
          {open ? <ProductDetailCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
