import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import cartReducer from './cart/cart.reducer';
import authReducer from './auth/auth.reducer';
import { reviewsReducer } from './review.reducer'; // Fixed import
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  cartManager: cartReducer,
  authManager: authReducer,
  reviews: reviewsReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authManager', 'cartManager']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
