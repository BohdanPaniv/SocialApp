import {
  GET_FEED_LOADED,
  GET_FEED_LOADING,
  FEED_ADDED,
  GET_FEED_ERROR,
  POST_LIKED,
  POST_UNLIKED
} from "../actions/types";

const initialState = {
  feed: [],
  isLoading: false
};

export default function feedReducer(state = initialState, action){
  switch (action.type) {
    case GET_FEED_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_FEED_LOADED:
      return {
        ...state,
        feed: action.payload,
        isLoading: false
      };
    case FEED_ADDED:
      return {
        ...state,
        feed: [action.payload, ...state.feed]
      };
    case GET_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        feed: null
      }
    case POST_LIKED:
    case POST_UNLIKED:
      return{
        ...state
      };
    default:
      return state;
  }
}