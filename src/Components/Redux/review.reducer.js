const initialState = {
  reviews: [],
<<<<<<< HEAD
  loading: false,
  error: null
=======
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return {
        ...state,
<<<<<<< HEAD
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
=======
        reviews: [...state.reviews, action.payload], // Add new review to the reviews array
>>>>>>> 236723fcb021bbefdad43471ac646e25e4855221
      };
    default:
      return state;
  }
};