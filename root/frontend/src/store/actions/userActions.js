import {
  CLEAR_RESPONSE,
  FOLLOWING_ADDED,
  FOLLOWING_ERROR,
  FOLLOWING_REMOVED,
  GET_USER_ERROR,
  USER_NAME_CHANGED,
  CHANGE_USER_NAME_ERROR,
  PROFILE_PICTURE_CHANGED,
  CHANGE_PROFILE_PICTURE_ERROR,
  IMAGE_SAVED,
  SAVE_IMAGE_ERROR,
  OLD_PROFILE_PICTURE_DELETED,
  DELETE_OLD_PROFILE_PICTURE_ERROR,
  COVER_PICTURE_CHANGED,
  CHANGE_COVER_PICTURE_ERROR,
  DELETE_OLD_COVER_PICTURE_ERROR,
  OLD_COVER_PICTURE_DELETED,
  USER_INFO_CHANGED,
  CHANGE_USER_INFO_ERROR
} from "./types";
import axios from "./../../utils/API";
import { returnResponse } from "./responseActions";

export const getUser = (data) => {
  return async(dispatch) => {
    return await axios.post("users/getUser", data).then(res => {
      return res.data;
    })
    .catch(error => {
      dispatch({
        type: GET_USER_ERROR
      });
    });
  };
};

export const addFollowing = (data) => {
  return async(dispatch) => {
    await axios.post("users/addFollowing", data).then(res => {
      dispatch({
        type: FOLLOWING_ADDED,
        payload: res.data.user
      });
    })
    .catch(error => {
      dispatch({
        type: FOLLOWING_ERROR
      });
    });
  };
};

export const removeFollowing = (data) => {
  return async(dispatch) => {
    await axios.post("users/removeFollowing", data).then(res => {
      dispatch({
        type: FOLLOWING_REMOVED,
        payload: res.data.user
      });
    })
    .catch(error => {
      dispatch({
        type: FOLLOWING_ERROR
      });
    });
  };
};

export const changeName = ({ data, setIsChangeName }) => {
  return async(dispatch) => {
    await axios.post("users/changeName", data).then(res => {
      dispatch(
        returnResponse(res.data, res.status, USER_NAME_CHANGED)
      );

      dispatch({
        type: USER_NAME_CHANGED,
        payload: res.data.user
      });

      setIsChangeName(false);
    })
    .catch(error => {
      dispatch(
        returnResponse(error.response.data, error.response.status, CHANGE_USER_NAME_ERROR)
      );

      dispatch({
        type: CHANGE_USER_NAME_ERROR
      });
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
};

export const changeUserInfo = ({ data, setIsChangeUserInfo }) => {
  return async(dispatch) => {
    await axios.post("users/changeUserInfo", data).then(res => {
      dispatch(
        returnResponse(res.data, res.status, USER_INFO_CHANGED)
      );

      dispatch({
        type: USER_INFO_CHANGED,
        payload: res.data.user
      });

      setIsChangeUserInfo(false);
    })
    .catch(error => {
      dispatch(
        returnResponse(error.response.data, error.response.status, CHANGE_USER_INFO_ERROR)
      );

      dispatch({
        type: CHANGE_USER_INFO_ERROR
      });
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
};

export const changePicture = ({ data, type }) => {
  return async(dispatch) => {
    const formData = new FormData();
    formData.append("file", data.image);

    await axios.post("file/upload", formData).then(res => {
      dispatch({
        type: IMAGE_SAVED
      });

      data.image = res.data.filename;
    })
    .catch(err => {
      dispatch({
        type: SAVE_IMAGE_ERROR
      });
    });

    switch (type) {
      case "PROFILE":
        await axios.post("users/changeProfilePicture", data).then(res => {
          dispatch(
            returnResponse(res.data, res.status, PROFILE_PICTURE_CHANGED)
          );
    
          dispatch({
            type: PROFILE_PICTURE_CHANGED,
            payload: res.data.user
          });
        })
        .catch(error => {
          dispatch(
            returnResponse(error.response.data, error.response.status, CHANGE_PROFILE_PICTURE_ERROR)
          );
    
          dispatch({
            type: CHANGE_PROFILE_PICTURE_ERROR
          });
        });
        break;
      case "COVER":
        await axios.post("users/changeCoverPicture", data).then(res => {
          dispatch(
            returnResponse(res.data, res.status, COVER_PICTURE_CHANGED)
          );
    
          dispatch({
            type: COVER_PICTURE_CHANGED,
            payload: res.data.user
          });
        })
        .catch(error => {
          dispatch(
            returnResponse(error.response.data, error.response.status, CHANGE_COVER_PICTURE_ERROR)
          );
    
          dispatch({
            type: CHANGE_COVER_PICTURE_ERROR
          });
        });
        break;
      default:
        break;
    }

    dispatch({
      type: CLEAR_RESPONSE
    });

    if (data.oldImage) {
      await axios.delete(`/image/delete/${data.oldImage}`).then(res => {
        dispatch({
          type: type === "PROFILE" ? OLD_PROFILE_PICTURE_DELETED : OLD_COVER_PICTURE_DELETED,
          payload: res.data.user
        });
      })
      .catch(error => {
        dispatch({
          type: type === "PROFILE" ? DELETE_OLD_PROFILE_PICTURE_ERROR : DELETE_OLD_COVER_PICTURE_ERROR
        });
      });
    }
  };
};

export const getPossibleFollowing = (data) => {
  return async(dispatch) => {
    return await axios.post("users/getPossibleFollowing", data);
  };
};

export const getFollowers = (data) => {
  return async(dispatch) => {
    return await axios.post("users/getFollowers", data);
  };
};

export const getFollowing = (data) => {
  return async(dispatch) => {
    return await axios.post("users/getFollowing", data);
  };
};