<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit';

=======
import {
  AUTH_ADMIN_LOGIN,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SIGN_UP,
} from "./auth.action.types";
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  ADMIN_LOGIN
} from './auth.actions';
const int = {
  email: "",
  password: "",
  username: "",
};
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
const initialState = {
  isAuth: false,
  adminIsAuth: false,
  userdata: {
    username: '',
    email: '',
    uid: ''
  },
  error: null,
  loading: false
};
<<<<<<< HEAD

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuth = true;
      state.userdata = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.adminIsAuth = false;
      state.userdata = { username: '', email: '', uid: '' };
      state.error = null;
      state.loading = false;
    },
    adminLoginSuccess(state, action) {
      state.adminIsAuth = true;
      state.userdata = action.payload;
      state.loading = false;
      state.error = null;
=======
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SIGN_UP: {
      localStorage.setItem("userdata", JSON.stringify(payload));
      return { ...state, userdata: payload };
    }
    case AUTH_LOGIN: {
      localStorage.setItem("isAuth", true);
      return { ...state, isAuth: true };
    }
    case AUTH_LOGOUT: {
      localStorage.setItem("isAuth", false);
      return { ...state, isAuth: false };
    }
    case AUTH_ADMIN_LOGIN: {
      localStorage.setItem("adminIsAuth", true);
      return { ...state, adminIsAuth: true };
    }
    case USER_SIGNUP_SUCCESS:
      return {

        uid: 'abc123',
        email: 'user@example.com',
        username: 'testuser'

      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: type.payload,
        loading: false,
        error: null
      };


    default: {
      return state;
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, adminLoginSuccess } = authSlice.actions;
export default authSlice.reducer;