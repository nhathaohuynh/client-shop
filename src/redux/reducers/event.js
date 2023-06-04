import { createReducer } from "@reduxjs/toolkit";

const initialValue = {
  events: [],
  loadingCreate: false,
  successCreate: false,
  loadingEvent: false,
  successEvent: false,
  loadingDelete: false,
  successDelete: false,
  error: null,
};

export const eventReducer = createReducer(initialValue, {
  EventRequest: (state) => {
    state.loadingCreate = true;
  },
  EventSuccess: (state) => {
    state.loadingCreate = false;
    state.successCreate = true;
  },
  EventFail: (state, action) => {
    state.loadingCreate = false;
    state.error = action.payload;
  },
  GetEventSuccess: (state, action) => {
    state.loadingEvent = false;
    state.successEvent = true;
    state.events = action.payload;
  },
  GetEventRequest: (state) => {
    state.loadingEvent = true;
  },
  GetEventFail: (state) => {
    state.loadingEvent = false;
  },
  DeleteEventSuccess: (state, action) => {
    state.loadingDelete = false;
    state.successDelete = true;
    state.events = action.payload;
  },
  DeleteEventRequest: (state) => {
    state.loadingDelete = true;
  },
  DeleteEventFail: (state) => {
    state.loadingDelete = false;
  },
  EventHome: (state, action) => {
    state.events = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
