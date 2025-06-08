import { loginStart, loginSuccess, loginFailure, logout } from './auth.reducer';
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword, signOut } from '../../Pages/firebase';

export const userLogin = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(loginSuccess({
      username: user.displayName || email.split('@')[0],
      email: user.email,
      uid: user.uid
    }));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const userGoogleLogin = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    dispatch(loginSuccess({
      username: user.displayName || user.email.split('@')[0],
      email: user.email,
      uid: user.uid
    }));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const userSignUp = (data) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    dispatch(loginSuccess({
      username: data.username,
      email: user.email,
      uid: user.uid
    }));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};
