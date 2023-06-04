import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  seller: null,
  isSeller: false,
  loading: false,
  save: false,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.loading = true;
  },

  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.seller = action.payload;
    state.loading = false;
    state.save = true;
  },

  LoadSellerFail: (state, action) => {
    state.loading = false;
    state.isSeller = false;
   
    state.error = action.payload;
  },
  ClearError: (state) => {
    state.error = null;
  },
});
