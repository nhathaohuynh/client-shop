import instance from "../../axios";

export const createEvent = (form) => async (dispatch) => {
  try {
    dispatch({
      type: "EventRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = instance.post("/event/create-event", form, config);

    dispatch({
      type: "EventSuccess",
      payload: data?.events,
    });
  } catch (err) {
    dispatch({
      type: "EventFail",
      payload: err.response.data.message,
    });
  }
};

export const getAllEvent = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetEventRequest",
    });
    const { data } = await instance.get(`/event/getAllEvent/${shopId}`);

    dispatch({
      type: "GetEventSuccess",
      payload: data?.events,
    });
  } catch (err) {
    dispatch({
      type: "GetEventFail",
      payload: err.response.data.message,
    });
  }
};

export const deleteEvent = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteEventRequest",
    });
    const { data } = await instance.delete(`/event/deleteEvent/${shopId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteEventSuccess",
      payload: data?.events,
    });
  } catch (err) {
    dispatch({
      type: "DeleteEventFail",
      payload: err.response.data.message,
    });
  }
};

export const getEventHome = () => async (dispatch) => {
  try {
    const { data } = await instance("/event/all");

    dispatch({
      type: "EventHome",
      payload: data?.events,
    });
  } catch (err) {
    console.log(err);
  }
};
