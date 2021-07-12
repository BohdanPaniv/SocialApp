import {
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_RESPONSE,
  LOGOUT_FAIL,
  PASSWORD_CHANGED,
  CHANGE_PASSWORD_ERROR,
  CHECK_EMAIL_SUCCESS,
  CHECKING_EMAIL_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "./types";
import axios from "./../../utils/API";
import { returnResponse } from "./responseActions";

export const logIn = (data) => {
  return async(dispatch) => {
    await axios.post("auth/login", data).then(res => {
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
  };
};

export const register = (data) => {
  return async(dispatch) => {
    await axios.post("auth/register", data).then(res => {
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
  };
};

export const logOut = () => {
  return async(dispatch) => {
    await axios.post("auth/logOut").then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(error => {
      dispatch({
        type: LOGOUT_FAIL
      });
    });
  };
};

export const loadUser = () =>{
  return async(dispatch) => {
    dispatch({ type: USER_LOADING });
  
    await axios.get("auth/user").then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
  };
};

export const changePassword = ({ data, setIsChangePassword }) => {
  return async(dispatch) => {
    await axios.post("auth/changePassword", data).then(res => {
      dispatch(
        returnResponse(res.data, res.status, PASSWORD_CHANGED)
      );

      dispatch({
        type: PASSWORD_CHANGED,
        payload: res.data.user
      });

      setIsChangePassword(false);
    })
    .catch(error => {
      dispatch(
        returnResponse(error.response.data, error.response.status, CHANGE_PASSWORD_ERROR)
      );

      dispatch({
        type: CHANGE_PASSWORD_ERROR
      });
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
};

export const sendToEmail = (data) => {
  return async(dispatch) => {
    await axios.post("auth/sendToEmail", data).then(res => {
      dispatch(
        returnResponse(res.data, res.status, CHECK_EMAIL_SUCCESS)
      );

      dispatch({
        type: CHECK_EMAIL_SUCCESS,
        payload: res.data.user
      });
    })
    .catch(error => {
      dispatch(
        returnResponse(error.response.data, error.response.status, CHECKING_EMAIL_ERROR)
      );

      dispatch({
        type: CHECKING_EMAIL_ERROR
      });
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
};

export const resetPassword = (data) => {
  return async(dispatch) => {
    return await axios.post("auth/resetPassword", data).then(res => {
      dispatch(
        returnResponse(res.data, res.status, RESET_PASSWORD_SUCCESS)
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });

      dispatch({
        type: CLEAR_RESPONSE
      });

      return true;
    })
    .catch(error => {
      dispatch(
        returnResponse(error.response.data, error.response.status, RESET_PASSWORD_ERROR)
      );

      dispatch({
        type: RESET_PASSWORD_ERROR
      });

      dispatch({
        type: CLEAR_RESPONSE
      });

      return false;
    });
  };
};