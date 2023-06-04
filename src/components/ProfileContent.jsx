import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../styles/style";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const initialInput = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    zipCode: user?.zipCode || "",
    address1: user?.address1 || "",
    address2: user?.address2 || "",
  };
  const [inputs, setInputs] = useState(initialInput);

  const handleChangeInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {/* this is profile */}
      {active === 1 && (
        <div>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar}
                className="w-[200px] h-[200px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block 800px:pb-5 pb-2">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[500] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    name="name"
                    value={inputs.name}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[500] mb-1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    name="email"
                    value={inputs.email}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block 800px:pb-5 pb-2">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[500] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    name="phone"
                    value={inputs.phone}
                    onChange={handleChangeInput}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[500] mb-1">Zip Code</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    name="zipCode"
                    value={inputs.zipCode}
                    onChange={() => handleChangeInput}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[500] mb-1">
                    Address 1
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    name="address1"
                    value={inputs.address1}
                    onChange={handleChangeInput}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-[500] mb-1">
                    Address 2
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    name="address2"
                    value={inputs.address2}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
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

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">My Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5>Default</h5>
        </div>
        <div className=" pl-8 flex items-center">
          <h6>Thị Xã Duyên Hải Trà Vinh</h6>
        </div>
        <div className=" hidden pl-8 800px:flex items-center">
          <h6>0399331472</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete
            size={25}
            className="cursor-pointer"
          ></AiOutlineDelete>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
