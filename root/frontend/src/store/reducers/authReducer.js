import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_FAIL,
  FOLLOWING_ADDED,
  FOLLOWING_ERROR,
  FOLLOWING_REMOVED
} from '../actions/types';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export default function authReducer(state = initialState, action){
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case FOLLOWING_ADDED:
    case FOLLOWING_REMOVED:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case LOGOUT_FAIL:
    case FOLLOWING_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}