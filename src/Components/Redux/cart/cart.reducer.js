import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  GET_CART_PRODUCTS,
  RESET_CART,
  UPDATE_QUANTITY
} from "./cart.action.types";

let initialState = {
  products: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const existingItem = state.products.find(item => item.id === payload.id);
      
      let updatedCart;
      if (existingItem) {
        // If item exists, update quantity
        updatedCart = state.products.map(item =>
          item.id === payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        updatedCart = [...state.products, { ...payload, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, products: updatedCart };
    }
    
    case DELETE_FROM_CART: {
      const updatedCart = state.products.filter((p) => p.id !== payload);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, products: updatedCart };
    }
    
    case UPDATE_QUANTITY: {
      const { id, quantity } = payload;
      const updatedCart = state.products.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0); // Remove if quantity is 0

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, products: updatedCart };
    }
    
    case RESET_CART: {
      localStorage.setItem("cartItems", JSON.stringify([]));
      return { ...state, products: [] };
    }
    
    default: {
      return state;
    }
  }
};

export default cartReducer;