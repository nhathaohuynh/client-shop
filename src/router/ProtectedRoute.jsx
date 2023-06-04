import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loading } from "../components";
import { loadSeller } from "../redux/actions/seller";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading) {
    return <Loading></Loading>;
  } else {
    if (!isAuthenticated) return <Navigate to="/login" replace></Navigate>;
    return <div>{children}</div>;
  }
};

export const ProtectedSellerRoute = ({ children }) => {
  const { isSeller, save } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSeller());
  }, []);
  if (save) {
    if (!isSeller) return <Navigate to="/login-shop" replace></Navigate>;
    return <div>{children}</div>;
  } else {
    return <Loading></Loading>;
  }
};

export default ProtectedRoute;
