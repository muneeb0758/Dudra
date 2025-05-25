<<<<<<< HEAD
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import cartReducer from './cart/cart.reducer';
import authReducer from './auth/auth.reducer';
import { reviewsReducer } from './review.reducer'; // Fixed import
=======
// store.js
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import cartReducer from './cart/cart.reducer';
import { authReducer } from './auth/auth.reducer';
import { reviewsReducer } from '../Redux/review.reducer'; // Import the reviews reducer
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  cartManager: cartReducer,
  authManager: authReducer,
<<<<<<< HEAD
  reviews: reviewsReducer
=======
  reviews: reviewsReducer, // Add reviewsReducer to the root reducer
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
});

const persistConfig = {
  key: 'root',
  storage,
<<<<<<< HEAD
  whitelist: ['authManager', 'cartManager']
=======
  whitelist: ['authManager'],
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);

<<<<<<< HEAD
export const persistor = persistStore(store);
=======
export const persistor = persistStore(store);
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
