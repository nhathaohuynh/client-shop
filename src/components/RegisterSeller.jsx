import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../styles/style";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

const RegisterSeller = () => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialValue = {
    name: "",
    phone: "",
    email: "",
    address: "",
    zipCode: "",
    password: "",
    avatar: "",
  };
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const form = new FormData();

    form.append("file", inputs.avatar);
    form.append("name", inputs.name);
    form.append("email", inputs.email);
    form.append("password", inputs.password);
    form.append("phone", inputs.phone);
    form.append("address", inputs.address);
    form.append("zipCode", inputs.zipCode);

    instance
      .post("/shop/create-shop", form, config)
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message, {
          position: "bottom-center",
          theme: "colored",
        });
        setInputs(initialValue);
        setTimeout(() => {
          navigate("/login-shop");
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleAvatar = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.files[0],
    });
  };
  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a shop
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleInputs}
                    value={inputs.name}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleInputs}
                    value={inputs.email}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    autoComplete="phone"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleInputs}
                    value={inputs.phone}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    autoComplete="address"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleInputs}
                    value={inputs.address}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="zipCode"
                    autoComplete="zipcode"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleInputs}
                    value={inputs.zipCode}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "password" : "text"}
                    name="password"
                    autoComplete="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleInputs}
                    value={inputs.password}
                  />
                  {!visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEyeInvisible>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="h-8 w-8 rounded-full overflow-hidden">
                    {inputs.avatar ? (
                      <img
                        src={URL.createObjectURL(inputs.avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={handleAvatar}
                    />
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already become an seller?</h4>
                <Link to="/login-shop" className="text-blue-600 pl-2">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSeller;
