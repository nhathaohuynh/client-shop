import instance from "../../axios";

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await instance.get("shop/seller", {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (err) {
    dispatch({
      type: "LoadSellerFail",
      payload: "Can not load seller",
    });
  }
};
