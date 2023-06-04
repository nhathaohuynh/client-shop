import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import {
  Home,
  RegisterPage,
  ActivationPage,
  LoginPage,
  EventPage,
  BestSellingPage,
  FAQPage,
  OrderSuccessPage,
  ErrorPage,
  ProductDetailPage,
  ProfilePage,
  ProductPage,
  RegisterSellerPage,
  ShopHomePage,
  ShopDashBoard,
  ShopCreateProduct,
  ShopAllProduct,
  ShopCreateEvent,
  ShopAllCoupon,
} from "../pages";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute, { ProtectedSellerRoute } from "./ProtectedRoute";
import LoginSellerPage from "../pages/LoginSellerPage";
import ActivationSellerPage from "../pages/ActivationSellerPage";
import ShopAllEvent from "../pages/shop/ShopAllEvent";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/dashboard-create-product",
        element: (
          <ProtectedSellerRoute>
            <ShopCreateProduct></ShopCreateProduct>
          </ProtectedSellerRoute>
        ),
      },
      {
        path: "/dashboard-create-event",
        element: (
          <ProtectedSellerRoute>
            <ShopCreateEvent></ShopCreateEvent>
          </ProtectedSellerRoute>
        ),
      },
      {
        path: "/dashboard-products",
        element: (
          <ProtectedSellerRoute>
            <ShopAllProduct></ShopAllProduct>
          </ProtectedSellerRoute>
        ),
      },
      {
        path: "/dashboard-events",
        element: (
          <ProtectedSellerRoute>
            <ShopAllEvent></ShopAllEvent>
          </ProtectedSellerRoute>
        ),
      },
      {
        path: "/dashboard-coupouns",
        element: (
          <ProtectedSellerRoute>
            <ShopAllCoupon></ShopAllCoupon>
          </ProtectedSellerRoute>
        ),
      },
      {
        path: "/shop/:id",
        element: <ShopHomePage></ShopHomePage>,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedSellerRoute>
            <ShopDashBoard></ShopDashBoard>
          </ProtectedSellerRoute>
        ),
      },
      {
        path: "/register-seller",
        element: <RegisterSellerPage />,
      },
      {
        path: "/product",
        children: [
          {
            path: ":name",
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: "/events",
        element: <EventPage />,
      },
      {
        path: "/best-selling",
        element: <BestSellingPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/order/success/:id",
        element: <OrderSuccessPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login-shop",
    element: <LoginSellerPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/activation/active",
    element: <ActivationPage />,
  },
  {
    path: "/activation/shop",
    element: <ActivationSellerPage />,
  },
]);
