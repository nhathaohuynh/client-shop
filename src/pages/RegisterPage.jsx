import React, { useEffect } from "react";
import { Signup } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  });
  return <Signup></Signup>;
};

export default RegisterPage;
