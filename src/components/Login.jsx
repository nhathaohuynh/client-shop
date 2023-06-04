import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/style";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axios";
import { toast } from "react-toastify";
const Login = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);

  const handleChangeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!remember) {
      toast.warn("Please check I am not robot", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }
    try {
      await instance
        .post(
          `/user/login-user`,
          {
            email: inputs.email,
            password: inputs.password,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          toast.success("Login Success", {
            position: "top-right",
            theme: "colored",
          });
          navigate("/");
          window.location.reload(true);
          setInputs({
            email: "",
            password: "",
          });
        });
    } catch (err) {
      toast.error("Username or password invalid", {
        position: "top-right",
        theme: "colored",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm "
                  onChange={handleChangeInputs}
                  value={inputs.email}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  className=" appearance-none block w-full px-3 py-2 border border-gray300 rounded-md shadow-sm placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handleChangeInputs}
                  value={inputs.password}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  ></AiOutlineEye>
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  ></AiOutlineEyeInvisible>
                )}
              </div>
            </div>
            <div className={styles.noramlFlex + " justify-between"}>
              <div className={styles.noramlFlex}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remeber-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I am not robot
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                className="group relative w-full h-[40px] justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/register" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
