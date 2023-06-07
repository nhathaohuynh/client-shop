import instance from "../../axios";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await instance.get("user/get-user", {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: "LoadUserFail",
      payload: "can't get infomation user",
    });
  }
};

export const updateUser = (form) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateUserRequest",
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await instance.put("/user/update-info", form, config);

    if (data?.success) {
      dispatch({
        type: "UpdateUserSuccess",
        payload: data?.user,
      });
    }
  } catch (err) {
    dispatch({
      type: "UpdateUserFail",
    });
  }
};

export const updateAddressUser = (form) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateAddressUserRequest",
    });

    const { data } = await instance.put(`/user/address`, form, {
      withCredentials: true,
    });

    dispatch({
      type: "UpdateAddressUserSuccess",
      payload: data?.user,
    });
  } catch (err) {
    dispatch({
      type: "UpdateAddressUserFail",
    });
  }
};
export const deleteAddressUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteAddressUserRequest",
    });

    const { data } = await instance.delete(`/user/address/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteAddressUserSuccess",
      payload: data?.user,
    });
  } catch (err) {
    dispatch({
      type: "DeleteAddressUserFail",
    });
  }
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: "ClearError",
  });
};
export const clearSuccessUpdate = () => (dispatch) => {
  dispatch({
    type: "ClearSuccessUpdate",
  });
};

export const clearSuccessUpdateAddress = () => (dispatch) => {
  dispatch({
    type: "ClearSuccessUpdateAddress",
  });
};

export const clearSuccessDeleteAddress = () => (dispatch) => {
  dispatch({
    type: "ClearSuccessDeleteAddress",
  });
};
