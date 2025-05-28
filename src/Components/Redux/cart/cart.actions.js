// cart.actions.js
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  GET_CART_PRODUCTS,
  RESET_CART,
  UPDATE_QUANTITY, // Import the new action type
} from "./cart.action.types";

export const getCartProducts = () => (dispatch) => {
  dispatch({ type: GET_CART_PRODUCTS });
};

export const addToCart = (data) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: data });
};

export const deleteToCart = (id) => (dispatch) => {
  dispatch({ type: DELETE_FROM_CART, payload: id });
};

export const resetCart = () => (dispatch) => {
  dispatch({ type: RESET_CART });
};

export const updateQuantity = (id, quantity) => (dispatch) => {
  dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
};

export const clearCart = () => ({
  type: "CLEAR_CART",
});
