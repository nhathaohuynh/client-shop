import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: false,
  loadingUpdate: false,
  successUpdate: false,
  loadingUpdateAddress: false,
  successUpdateAddress: false,
  loadingDeleteAddress: false,
  successDeleteAddress: false,

  errorUpdate: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },

  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },

  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.error = true;
  },

  UpdateUserRequest: (state) => {
    state.loadingUpdate = true;
  },
  UpdateUserSuccess: (state, action) => {
    state.loadingUpdate = false;
    state.user = action.payload;
    state.successUpdate = true;
  },
  UpdateUserFail: (state) => {
    state.loadingUpdate = false;
    state.error = true;
  },

  UpdateAddressUserRequest: (state) => {
    state.loadingUpdateAddress = true;
  },
  UpdateAddressUserSuccess: (state, action) => {
    state.loadingUpdateAddress = false;
    state.user = action.payload;
    state.successUpdateAddress = true;
  },
  UpdateAddressUserFail: (state) => {
    state.loadingUpdateAddress = false;
    state.error = true;
  },

  DeleteAddressUserRequest: (state) => {
    state.loadingDeleteAddress = true;
  },
  DeleteAddressUserSuccess: (state, action) => {
    state.loadingDeleteAddress = false;
    state.user = action.payload;
    state.successDeleteAddress = true;
  },
  DeleteAddressUserFail: (state) => {
    state.loadingDeleteAddress = false;
    state.error = true;
  },

  ClearError: (state) => {
    state.error = null;
  },

  ClearSuccessUpdate: (state) => {
    state.successUpdate = false;
  },

  ClearSuccessUpdateAddress: (state) => {
    state.successUpdateAddress = false;
  },

  ClearSuccessDeleteAddress: (state) => {
    state.successDeleteAddress = false;
  },
});
