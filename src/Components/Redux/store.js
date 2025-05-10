import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import cartReducer from "./cart/cart.reducer";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// First combine your reducers
const rootReducer = combineReducers({
  cartManager: cartReducer,
  authManager: authReducer,
});

// Then create the persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authManager'] // Note: Use the reducer key name ('authManager')
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = legacy_createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);

// Optional: Export persistor if you need it
export const persistor = persistStore(store);