<<<<<<< HEAD
import { loginStart, loginSuccess, loginFailure, logout } from './auth.reducer';
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword, signOut } from '../../firebase';
=======
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth, db, doc, setDoc } from '../../firebase';

// Action Types
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const ADMIN_LOGIN = 'ADMIN_LOGIN';

// Action Creators
export const userSignUp = (userData) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  
  try {
    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    
    // 2. Save additional user data in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: userData.username,
      email: userData.email,
      createdAt: new Date().toISOString(),
      isAdmin: false
    });

    // 3. Automatically log the user in
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      username: userData.username
    };

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: user
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user
    });

    return { success: true, user };
    
  } catch (error) {
    let errorMessage = "Signup failed";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Email already in use";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Password should be at least 6 characters";
    }

    dispatch({
      type: USER_SIGNUP_FAILURE,
      payload: errorMessage
    });

    return { success: false, error: errorMessage };
  }
};
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221

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

<<<<<<< HEAD
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
=======
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogout = () => ({
  type: USER_LOGOUT,
});
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
