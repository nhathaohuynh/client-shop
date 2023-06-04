import { createReducer } from "@reduxjs/toolkit";

const initState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

export const wishlistReducer = createReducer(initState, {
  AddToWishlist: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i) => i._id === item._id);
    // update product
    if (isItemExist) {
      return {
        wishlist: state.wishlist.map((i) => (i._id === item._id ? item : i)),
      };
    } else {
      return {
        wishlist: [...state.wishlist, item],
      };
    }
  },

  RemoveFromWishlist: (state, action) => {
    const idItem = action.payload;
    return {
      wishlist: state.wishlist.filter((i) => i._id !== idItem),
    };
  },

  ClearWishlist: () => {
    return {
      wishlit: [],
    };
  },
});
