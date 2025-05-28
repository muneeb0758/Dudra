import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs} from "firebase/firestore";

export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const REVIEWS_LOADING = 'REVIEWS_LOADING';
export const REVIEWS_ERROR = 'REVIEWS_ERROR';

export const addReview = (review) => {
  return {
    type: 'ADD_REVIEW',
    payload: review,
  };
};

export const fetchProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: 'REVIEWS_LOADING' });
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    dispatch({
      type: 'REVIEWS_FETCH_SUCCESS',
      payload: reviews
    });
  } catch (error) {
    dispatch({
      type: 'REVIEWS_ERROR',
      payload: error.message
    });
  }
};

