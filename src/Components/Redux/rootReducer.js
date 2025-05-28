// src/Redux/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import cartReducer from './cart/cart.reducer';
import reviewReducer from './review.reducer';

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  auth: authReducer,
  cart: cartReducer,
  reviews: reviewReducer,
});

export default rootReducer;