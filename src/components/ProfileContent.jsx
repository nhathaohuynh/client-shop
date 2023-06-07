import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../styles/style";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";
import instance from "../axios";
import { toast } from "react-toastify";
import {
  clearError,
  clearSuccessDeleteAddress,
  clearSuccessUpdate,
  clearSuccessUpdateAddress,
  deleteAddressUser,
  updateAddressUser,
  updateUser,
} from "../redux/actions/user";
import Loading from "./Loading";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";

const ProfileContent = ({ active }) => {
  const {
    user,
    loadingUpdate,
    successUpdate,
    error,
    successUpdateAddress,
    successDeleteAddress,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const initialInput = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    password: "",
    file: null,
  };
  const [inputs, setInputs] = useState(initialInput);

  useEffect(() => {
    setInputs(initialInput);
  }, [user]);

  useEffect(() => {
    if (successUpdate) {
      toast.success("Updating info user was successfully", {
        position: "bottom-center",
        theme: "colored",
      });
      dispatch(clearSuccessUpdate());
    }
    if (successUpdateAddress) {
      toast.success("Updating address user was successfully", {
        position: "bottom-center",
        theme: "colored",
      });
      dispatch(clearSuccessUpdateAddress());
    }
    if (successDeleteAddress) {
      toast.success("deleting address user was successfully", {
        position: "bottom-center",
        theme: "colored",
      });
      dispatch(clearSuccessDeleteAddress());
    }
    if (error) {
      toast.error("Updating info user failed", {
        position: "bottom-center",
        theme: "colored",
      });
      dispatch(clearError());
    }
  }, [successUpdate, error, successUpdateAddress, successDeleteAddress]);

  const handleChangeInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setInputs({
      ...inputs,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Form = new FormData();
    Form.append("file", inputs.file);
    Form.append("name", inputs.name);
    Form.append("email", inputs.email);
    Form.append("phone", inputs.phone);
    Form.append("password", inputs.password);

    dispatch(updateUser(Form));
    setInputs(initialInput);
  };
  return (
    <div className="w-full">
      {/* this is profile */}
      {active === 1 &&
        (loadingUpdate ? (
          <Loading></Loading>
        ) : (
          <div>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={
                    inputs.file
                      ? URL.createObjectURL(inputs.file)
                      : user?.avatar
                  }
                  className="w-[180px] h-[180px] rounded-full object-contain border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[40px] h-[40px] bg-[#3a24db] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] text-white">
                  <input
                    type="file"
                    id="image"
                    name="avatar"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera size={20} />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full 800px:w-[90%] m-auto px-5">
              <form onSubmit={handleSubmit} aria-required={true}>
                <div className="w-full 800px:flex block 800px:pb-5 pb-2">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2 font-[400] text-gray-500 font-Poppins mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} focus:border-[#3a24db] px-2 !w-[95%] mb-4 800px:mb-0`}
                      required
                      name="name"
                      value={inputs.name}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2 font-[400] text-gray-500 font-Poppins mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} focus:border-[#3a24db] px-2 w-[95%] mb-4 800px:mb-0`}
                      required
                      name="email"
                      value={inputs.email}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>

                <div className="w-full 800px:flex block 800px:pb-5 pb-2">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2 font-[400] text-gray-500 font-Poppins mb-1">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className={`${styles.input} focus:border-[#3a24db] px-2 !w-[95%] mb-4 800px:mb-0`}
                      required
                      name="phone"
                      value={inputs.phone}
                      onChange={handleChangeInput}
                    />
                  </div>

                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2 font-[400] text-gray-500 font-Poppins mb-1">
                      Enter your password
                    </label>
                    <input
                      type="password"
                      className={`${styles.input} focus:border-[#3a24db] px-2 w-[95%] mb-4 800px:mb-0`}
                      required
                      name="password"
                      value={inputs.password}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex block pb-3">
                  <button
                    className={`w-[47.5%] h-[40px] border bg-[#3a24db] font-[500] text-center text-[white] rounded-[3px] mt-8 cursor-pointer`}
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active === 3 && (
        <div>
          <AllRefunsOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "14wdd1q2e1ea12141414",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClass: (params) => {
        return params.value(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const AllRefunsOrders = () => {
  const orders = [
    {
      _id: "14wdd1q2e1ea12141414",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClass: (params) => {
        return params.value(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "14wdd1q2e1ea12141414",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClass: (params) => {
        return params.value(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};
const ChangePassword = () => {
  const initInputs = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [inputs, setInputs] = useState(initInputs);
  const [loading, setLoading] = useState(false);

  const handleChangeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    instance
      .put(
        `/user/update-password`,
        {
          oldPassword: inputs.oldPassword,
          newPassword: inputs.newPassword,
          confirmPassword: inputs.confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setLoading(false);
        toast.success("Password was updated successfully", {
          position: "bottom-center",
          theme: "colored",
        });
        setInputs(initInputs);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Password updating failed", {
          position: "bottom-center",
          theme: "colored",
        });
        setInputs(initInputs);
      });
  };

  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <div className="w-full px-5">
        <h1 className="block text-[30px] text-center font-[700] text-[#000000ba] pb-2 font-Poppins">
          Change Password
        </h1>
        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center"
          >
            <div className="w-[100%] 800px:w-[50%] mt-5">
              <label className="block pb-2 font-Poppins text-gray-600">
                Enter your old password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 px-2 border focus:border-[#3a24db]`}
                required
                name="oldPassword"
                value={inputs.oldPassword}
                onChange={(e) => handleChangeInputs(e)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2 font-Poppins text-gray-600">
                Enter your new password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 px-2 border focus:border-[#3a24db]`}
                required
                name="newPassword"
                value={inputs.newPassword}
                onChange={(e) => handleChangeInputs(e)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2 font-Poppins text-gray-600">
                Enter your confirm password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 px-2 border focus:border-[#3a24db]`}
                required
                name="confirmPassword"
                value={inputs.confirmPassword}
                onChange={(e) => handleChangeInputs(e)}
              />
              <button
                className={`w-[95%] h-[40px] border bg-[#3a24db] font-[500] text-center text-[white] rounded-[3px] mt-8 cursor-pointer`}
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [openDefault, setOpenDefault] = useState("");
  const { user, loadingUpdateAddress } = useSelector((state) => state.user);

  const initInputs = {
    country: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    addressType: "",
  };
  const [inputs, setInputs] = useState(initInputs);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleChangeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAddressUser(inputs));
    setInputs(initInputs);
    setOpen(false);
  };
  const handleChangeDefault = (e) => {
    setOpenDefault(e.target.value);
  };

  const deleteAddressHandle = (id) => {
    dispatch(deleteAddressUser(id));
  };

  const handleSetDefaultAddress = async () => {
    const { data } = await instance.put(
      "user/address/default",
      {
        addressType: openDefault,
      },
      {
        withCredentials: true,
      }
    );
    console.log(data.user);
  };
  return loadingUpdateAddress ? (
    <Loading></Loading>
  ) : (
    <div className="w-full px-5">
      {open && (
        <div
          className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[40%] h-[80vh] bg-white rounded shadow relative overflow-y-auto detailCard"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center font-Poppins font-bold text-[30px] text-[rgba(0,0,0,0.9)]">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="pb-2 w-[95%] m-auto">
                    <label className="block pb-2 font-[500] font-Poppins text-[15px] text-[rgba(0,0,0,0.8)]">
                      Country
                    </label>
                    <select
                      id=""
                      name="country"
                      value={inputs.country}
                      onChange={(e) => handleChangeInputs(e)}
                      className="w-full border h-[40px] rounded-[5px] select text-gray-600 focus:border-[#3a24db] text-[15px] px-2"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="pb-2 w-[95%] m-auto">
                    <label className="block pb-2 font-[500] font-Poppins text-[15px] text-[rgba(0,0,0,0.8)]">
                      Choose your City
                    </label>
                    <select
                      id=""
                      name="city"
                      value={inputs.city}
                      onChange={(e) => handleChangeInputs(e)}
                      disabled={inputs.country ? false : true}
                      className="w-full border h-[40px] rounded-[5px] select text-gray-600 focus:border-[#3a24db] text-[15px] px-2"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(inputs.country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="pb-2 w-[95%] m-auto">
                    <label className="block pb-2 font-[500] font-Poppins text-[15px] text-[rgba(0,0,0,0.8)]">
                      Address 1
                    </label>
                    <input
                      type="address"
                      className={`${styles.input} focus:border-[#3a24db] px-2 !w-[100%] text-[15px]`}
                      required
                      name="address1"
                      value={inputs.address1}
                      onChange={(e) => handleChangeInputs(e)}
                    />
                  </div>
                  <div className="pb-2 w-[95%] m-auto">
                    <label className="block pb-2 font-[500] font-Poppins text-[15px] text-[rgba(0,0,0,0.8)]">
                      Address 2
                    </label>
                    <input
                      type="address"
                      className={`${styles.input} focus:border-[#3a24db] px-2 !w-[100%] text-[15px]`}
                      required
                      name="address2"
                      value={inputs.address2}
                      onChange={(e) => handleChangeInputs(e)}
                    />
                  </div>

                  <div className="pb-2 w-[95%] m-auto">
                    <label className="block pb-2 font-[500] font-Poppins text-[15px] text-[rgba(0,0,0,0.8)]">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      className={`${styles.input} focus:border-[#3a24db] px-2 !w-[100%] text-[15px]`}
                      required
                      name="zipCode"
                      value={inputs.zipCode}
                      onChange={(e) => handleChangeInputs(e)}
                    />
                  </div>

                  <div className="pb-2 w-[95%] m-auto">
                    <label className="block pb-2 font-[500] font-Poppins text-[15px] text-[rgba(0,0,0,0.8)]">
                      Address Type
                    </label>
                    <select
                      id=""
                      name="addressType"
                      value={inputs.addressType}
                      onChange={(e) => handleChangeInputs(e)}
                      className="w-[100%] border h-[40px] rounded-[5px] select text-gray-600 focus:border-[#3a24db] text-[15px] px-2"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="pb-2 w-[95%] m-auto">
                    <button
                      className={`w-full h-[40px] border bg-[#3a24db] font-[500] text-center text-[white] rounded-[3px] mt-8 cursor-pointer`}
                      type="submit"
                      aria-readonly
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="pb-2 w-[100%]">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[20px] font-[600] text-[#000000ba] mb-5">
            Default Address
          </h1>
          <div
            className={`${styles.button} !rounded-md font-Poppins !bg-[#3a24db]`}
            onClick={() => handleSetDefaultAddress()}
          >
            <span className="text-white">Set Default</span>
          </div>
        </div>
        <select
          id=""
          name="addressType"
          value={openDefault}
          onChange={(e) => handleChangeDefault(e)}
          className="w-[100%] border h-[40px] rounded-[5px] select text-gray-600 focus:border-[#3a24db] text-[15px] px-2"
        >
          <option value="" className="block border pb-2">
            Choose your Address Type
          </option>
          {addressTypeData &&
            addressTypeData.map((item) => (
              <option className="block pb-2" key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-[20px] font-[600] text-[#000000ba]">My Address</h1>

        <div
          className={`${styles.button} !rounded-md font-Poppins !bg-[#3a24db]`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      {user && user?.addresses.length > 0 && (
        <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 pr-14 shadow justify-between text-[14px] font-[500]">
          <div className="w-[5%] flex items-center">
            <h5>Type</h5>
          </div>
          <div className="w-[55%] pl-8 flex items-center">
            <h6>Address</h6>
          </div>
          <div className="w-[20%] hidden pl-8 1000px:flex items-center">
            <h6>Phone Number</h6>
          </div>
          <div>Delete</div>
        </div>
      )}

      {user &&
        user?.addresses.length > 0 &&
        user?.addresses.map((item) => {
          return (
            <div key={crypto.randomUUID()}>
              <div className="h-[1px] bg-gray-200 w-full"></div>
              <div className="w-full bg-gray-100 h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between text-[14px] font-[500]">
                <div className="w-[5%] flex items-center">
                  <h5>{item?.addressType}</h5>
                </div>
                <div className="w-[55%] pl-8 flex items-center">
                  <h6>
                    {item?.address1} {item?.address2}
                  </h6>
                </div>
                <div className="w-[20%] hidden pl-8 1000px:flex items-center">
                  <h6>{user?.phoneNumber}</h6>
                </div>
                <div
                  className="hover:text-red-500 transition flex ml-2"
                  onClick={() => deleteAddressHandle(item?._id)}
                >
                  <AiOutlineDelete
                    size={20}
                    className="cursor-pointer"
                  ></AiOutlineDelete>
                </div>
                <div></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProfileContent;
