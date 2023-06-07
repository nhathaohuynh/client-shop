import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";

const CheckoutDetail = () => {
  const { user: client } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [userInfo, setUserInfo] = useState(false);
  const [user, setUser] = useState(client);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState("");
  const [discountPrice, setDiscountPrice] = useState(null);

  const initInputs = {
    country: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
  };

  const [inputs, setInputs] = useState(initInputs);

  useEffect(() => {
    setUser(client);
  }, [client]);

  const changeInputsHandle = (e, value, name) => {
    if (name && value) {
      setInputs((prev) => ({ ...prev, [name]: value }));
    } else if (!value) {
      setInputs(initInputs);
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const subTotalPrice = cart?.reduce((acc, item) => {
    return acc + item.qty * item.discountPrice;
  }, 0);

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const shipping = subTotalPrice * 0.05;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const applyCounponCodeHandle = (e) => {
    e.preventDefault();
    console.log(couponCode);
  };
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex ">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            inputs={inputs}
            changeInputsHandle={changeInputsHandle}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={applyCounponCodeHandle}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  userInfo,
  setUserInfo,
  inputs,
  changeInputsHandle,
}) => {
  const [checked, setChecked] = useState("");
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8 h-[100%]">
      <h5 className="text-[20px] font-[600] text-[#f63b60]">
        Shipping Address
      </h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Full Name</label>
            <input
              type="text"
              value={user ? user?.name : ""}
              readOnly
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Email Address</label>
            <input
              type="email"
              value={user ? user?.email : ""}
              readOnly
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Phone Number</label>
            <input
              type="number"
              required
              value={user ? user?.phoneNumber : ""}
              readOnly
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Zip Code</label>
            <input
              type="number"
              value={inputs.zipCode}
              name="zipCode"
              onChange={(e) => changeInputsHandle(e)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px] select"
              value={inputs.country}
              name="country"
              onChange={(e) => changeInputsHandle(e)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">City</label>
            <select
              className="w-[100%] border h-[40px] rounded-[5px] select"
              value={inputs.city}
              name="city"
              onChange={(e) => changeInputsHandle(e)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(inputs.country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Address1</label>
            <input
              type="address"
              required
              value={inputs.address1}
              name="address1"
              onChange={(e) => changeInputsHandle(e)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Address2</label>
            <input
              type="address"
              value={inputs.address2}
              name="address2"
              onChange={(e) => changeInputsHandle(e)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[16px] cursor-pointer font-[500] flex items-center relative w-max"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
        <IoIosArrowDown
          size={20}
          className="absolute right-[-30px] top-1 cursor-pointer"
        />
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item) => (
              <div key={crypto.randomUUID()} className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-5 w-[15px]"
                  value={item.addressType}
                  id={item.addressType}
                  checked={item.addressType === checked ? true : false}
                  onChange={(e) => {
                    setChecked((pre) =>
                      pre === item.addressType && checked
                        ? ""
                        : item.addressType
                    );
                    if (!checked) {
                      changeInputsHandle(e, item.address1, "address1") ||
                        changeInputsHandle(e, item.address2, "address2") ||
                        changeInputsHandle(e, item.zipCode, "zipCode") ||
                        changeInputsHandle(e, item.country, "country") ||
                        changeInputsHandle(e, item.city, "city");
                    } else {
                      changeInputsHandle(e, "");
                    }
                  }}
                />
                <label htmlFor={item.addressType}>
                  {item.default ? "Default" : item.addressType}
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  const paymentSubmit = () => {};
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8 h-[100%]">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[500] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">{subTotalPrice}$</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[500] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">{shipping?.toFixed(2)}$</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[500] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] font-[500] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
      <div
        className={`${styles.button} !w-full !bg-[#f63b60] 800px:w-[280px] mt-12 font-bold`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

export default CheckoutDetail;
