/// add to cart
export const addToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: "AddToCart",
    payload: product,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));

  return product;
};

export const removeFromCart = (product) => (dispatch, getState) => {
  dispatch({
    type: "RemoveFromCart",
    payload: product._id,
  });

  localStorage.setItem(JSON.stringify(getState().cart.cart));

  return product;
};
