// add to wishlist

export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: "AddToWishlist",
    payload: product,
  });

  localStorage.setItem(
    "wishlist",
    JSON.stringify(getState()?.wishlist.wishlist)
  );
  return product;
};

export const removeFromWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: "RemoveFromWishlist",
    payload: product?._id,
  });

  localStorage.setItem(
    "wishlist",
    JSON.stringify(getState()?.wishlist.wishlist)
  );

  return product;
};

export const clearWishlist = () => (dispatch, getState) => {
  dispatch({
    type: "ClearWishlist",
  });

  localStorage.setItem("wishlist", JSON.stringify([]));
};
