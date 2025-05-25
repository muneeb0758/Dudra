import { createSlice } from '@reduxjs/toolkit';

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
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, adminLoginSuccess } = authSlice.actions;
export default authSlice.reducer;