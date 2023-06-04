import React, { useEffect } from "react";
import route from "./router";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/user";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
