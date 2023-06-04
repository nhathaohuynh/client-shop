import { createReducer } from "@reduxjs/toolkit";

const initialValue = {
  products: [],
  loadingCreate: false,
  successCreate: false,
  loadingProduct: false,
  successProduct: false,
  loadingDelete: false,
  successDelete: false,
  error: null,
};

export const productReducer = createReducer(initialValue, {
  ProdcutRequest: (state) => {
    state.loadingCreate = true;
  },
  ProductSuccess: (state) => {
    state.loadingCreate = false;
    state.successCreate = true;
  },
  ProductFail: (state, action) => {
    state.loadingCreate = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },

  GetProdcutRequest: (state) => {
    state.loadingProduct = true;
  },

  GetProdcutSuccess: (state, action) => {
    state.loadingProduct = false;
    state.products = action.payload;
    state.successProduct = true;
  },

  GetProdcutFail: (state, action) => {
    state.loadingProduct = false;
    state.error = action.payload;
  },

  DeleteProdcutRequest: (state) => {
    state.loadingDelete = true;
  },

  DeleteProdcutSuccess: (state, action) => {
    state.loadingDelete = false;
    state.products = action.payload;
    state.successDelete = true;
  },

  DeleteProdcutFail: (state, action) => {
    state.loadingDelete = false;
    state.error = action.payload;
  },

  ProductHome: (state, action) => {
    state.products = action.payload;
  },
});
