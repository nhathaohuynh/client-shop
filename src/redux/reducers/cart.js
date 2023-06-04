import { createReducer } from "@reduxjs/toolkit";

const initState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initState, {
  AddToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i._id === item._id);

    if (isItemExist)
      return {
        cart: state.cart.map((i) => (i._id === item._id ? item : i)),
      };

    return {
      cart: [...state.cart, item],
    };
  },

  RemoveFromCart: (state, action) => {
    return {
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },
});
