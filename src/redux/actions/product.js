//create product

import instance from "../../axios";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "ProductRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = instance.post("/product/create-product", formData, config);

    dispatch({
      type: "ProductSuccess",
      payload: data?.product,
    });
  } catch (err) {
    dispatch({
      type: "ProductFail",
      payload: err.response.data.message,
    });
  }
};

export const getAllProducts = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetProdcutRequest",
    });
    const { data } = await instance.get(`/product/getAllProducts/${productId}`);
    dispatch({
      type: "GetProdcutSuccess",
      payload: data?.products,
    });
  } catch (err) {
    dispatch({
      type: "GetProdcutFail",
      payload: err.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteProdcutRequest",
    });

    const { data } = await instance.delete(
      `/product/deleteProduct/${productId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "DeleteProdcutSuccess",
      payload: data?.products,
    });
  } catch (err) {
    dispatch({
      type: "DeleteProdcutFail",
      payload: err.response.data.message,
    });
  }
};

export const getProductHome = () => async (dispatch) => {
  try {
    const { data } = await instance.get("/product/all");
    dispatch({
      type: "ProductHome",
      payload: data?.products,
    });
  } catch (err) {
    console.log(err);
  }
};
