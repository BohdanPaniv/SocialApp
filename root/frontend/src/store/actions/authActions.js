import {
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_RESPONSE
} from "./types";
import axios from "./../../utils/API";
import { returnResponse } from "./responseActions";

export const logIn = (data) => {
  return async(dispatch) => {
    await axios
    .post("auth/login", data)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnResponse(err.response.data, err.response.status, REGISTER_FAIL)
      );

      dispatch({
        type: LOGIN_FAIL
      });
      
      dispatch({
        type: CLEAR_RESPONSE
      });
    });
  }
}

export const register = (data) => {
  return async(dispatch) => {
    await axios
    .post("auth/register", data)
    .then(res => {
      dispatch(
        returnResponse(res.data, res.status, REGISTER_SUCCESS)
      );

      dispatch({
        type: REGISTER_SUCCESS
      });
    })
    .catch(err => {
      dispatch(
        returnResponse(err.response.data, err.response.status, REGISTER_FAIL)
      );

      dispatch({
        type: REGISTER_FAIL
      });
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  }
}

export const logOut = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const loadUser = () =>{
  return async (dispatch) => {
    dispatch({ type: USER_LOADING });
  
    await axios
    .get("auth/user")
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnResponse(err.response.data, err.response.status)
      );
      
      dispatch({
        type: AUTH_ERROR
      });

      dispatch({
        type: CLEAR_RESPONSE
      });
    });
  }
}