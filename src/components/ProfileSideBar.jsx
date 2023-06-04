import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import instance from "../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    instance
      .get("/user/logout", { withCredentials: true })
      .then((res) => {
        toast.success(res?.data?.message, {
          position: "top-right",
          theme: "colored",
        });
        dispatch(loadUser());
        navigate("/login");
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 font-[500] text-[18px]">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
        >
          <RxPerson size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(3)}
        >
          <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Refunds
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(4) || navigate("/inbox")}
        >
          <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Inbox
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(5)}
        >
          <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Track Order
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(6)}
        >
          <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Change Password
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(7)}
        >
          <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Address
          </span>
        </div>

        {/* {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                color={active === 7 ? "red" : ""}
              />
              <span
                className={`pl-3 ${
                  active === 8 ? "text-[red]" : ""
                } 800px:block hidden`}
              >
                Admin Dashboard
              </span>
            </div>
          </Link>
        )} */}
        <div
          className="single_item flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(8) || logoutHandler()}
        >
          <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
