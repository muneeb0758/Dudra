const initialState = {
  reviews: [],
  loading: false,
  error: null
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      };
    case 'REVIEWS_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'REVIEWS_FETCH_SUCCESS':
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null
      };
    case 'REVIEWS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};