import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData } from "../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import styles from "../styles/style";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import { RxCross1 } from "react-icons/rx";

function Header({ activeHeading }) {
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [activeScroll, setActiveScroll] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSearchChange = (e) => {
    const productData = products.length > 0 && products;
    const term = e.target.value.trim();
    setSearchTerm(term);

    const filterProducts =
      productData.length > 0 &&
      term &&
      productData.filter((product) => {
        return product?.name.toLowerCase().includes(term.toLowerCase());
      });

    setSearchData(filterProducts);
  };

  window.addEventListener("scroll", () => {
    setActiveScroll(window.scrollY > 150 ? true : false);
  });
  return (
    <>
      <div className={styles.section}>
        <div className="hidden 800px:h-[50px] 800px:my[20px] 800px:flex items-center justify-between mt-2">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="What are products you looking for today"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[1px] rounded-md "
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer text-gray-500"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute max-h-[50vh] bg-slate-50 shadow-lg rounded-md z-[1] p-4 overflow-y-auto detailCard !w-full mt-3">
                {searchData.length > 0 &&
                  searchData.map((i) => {
                    return (
                      <div
                        key={crypto.randomUUID()}
                        onClick={() => {
                          setSearchData("");
                          navigate(`/product/${i?._id}`);
                          setSearchTerm("");
                        }}
                        className="block hover:bg-[rgba(0,0,0,0.05)] w-full px-2 rounded-sm"
                      >
                        <div className="w-full flex items-center  py-3 ">
                          <img
                            src={i?.images[0]}
                            alt=""
                            className="w-[50px] h-[40px] mr-[10px] object-contain"
                          />
                          <h1 className="">{i?.name}</h1>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* become to seller */}
          <div className={styles.button}>
            <Link to="/register-seller">
              <h1 className="text-white flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1"></IoIosArrowForward>
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          activeScroll == true ? "shadow-sm fixed top-0 left-0 z-20" : "mt-3"
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px] `}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div>
            <div
              className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block"
              onClick={() => setDropdown(!dropdown)}
            >
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2"
              ></BiMenuAltLeft>
              <button className="h-[100%] w-full justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              />
              {dropdown ? (
                <Dropdown
                  setDropdown={setDropdown}
                  categoriesData={categoriesData}
                ></Dropdown>
              ) : null}
            </div>
          </div>
          {/* navbar item*/}
          <div className={styles.noramlFlex}>
            <Navbar active={activeHeading}></Navbar>
          </div>
          <div className="flex">
            <div className={styles.noramlFlex}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                ></AiOutlineHeart>
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist?.length > 0 ? wishlist.length : 0}
                </span>
              </div>
            </div>
            <div className={styles.noramlFlex}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                ></AiOutlineShoppingCart>
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart?.length > 0 ? cart.length : 0}
                </span>
              </div>
            </div>
            <div className={styles.noramlFlex}>
              <div className="relative cursor-pointer">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile
                      size={30}
                      color="rgb(255 255 255 / 83%)"
                    ></CgProfile>
                  </Link>
                )}
              </div>
            </div>
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile header */}
      <div
        className={`${
          activeScroll === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div className="cursor-pointer">
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart?.length > 0 ? cart.length : 0}
              </span>
            </div>
          </div>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0"
            onClick={() => setOpen(false)}
          >
            <div
              className="fixed w-[60%] flex flex-col items-center gap-2 bg-white h-screen top-0 left-0 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart
                      size={30}
                      className="ml-3 mt-5 cursor-pointer"
                      onClick={() => setOpenWishlist(true) || setOpen(false)}
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist.length > 0 ? wishlist.length : 0}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={25}
                  className="ml-3 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                ></RxCross1>
              </div>

              {/* searchbar */}
              <div className={`my-8 w-[92%] m-auto h-[40px] relative`}>
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md mb-2"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 w-full left-0 p-3 h-[50vh] overflow-y-auto detailCard shadow-lg ">
                    {searchData.length > 0 &&
                      searchData.map((i) => {
                        return (
                          <Link
                            key={crypto.randomUUID()}
                            onClick={() => {
                              setSearchData("");
                              navigate(`/product/${i?._id}`);
                              setSearchTerm("");
                            }}
                            className="h-[60px] block hover:bg-[rgba(0,0,0,0.05)] w-full px-2 rounded-sm mb-1"
                          >
                            <div className="flex items-center h-full">
                              <img
                                src={i?.images[0]}
                                alt=""
                                className="w-[40px] mr-2"
                              />
                              <h5 className="text-ellipsis whitespace-nowrap overflow-hidden">
                                {i?.name}
                              </h5>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading}></Navbar>
              <div
                className={`${styles.button} ml-4 !rounded-[4px] bg-[#3957db] mt-10`}
              >
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <div className="flex w-full justify-center mt-10">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-[80px] h-[80px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7] hover:text-[#3957db]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/register"
                      className="text-[18px] text-[#000000b7] hover:text-[#3957db]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
