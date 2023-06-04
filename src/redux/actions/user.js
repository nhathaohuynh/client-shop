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
