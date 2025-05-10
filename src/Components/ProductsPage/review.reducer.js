const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REVIEWS_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        loading: false,
        error: null,
      };
    case 'FETCH_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null,
      };
    case 'REVIEWS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};