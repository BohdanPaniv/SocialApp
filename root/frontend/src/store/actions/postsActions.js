import {
  SAVE_IMAGE_ERROR,
  IMAGE_SAVED,
  CREATION_POST_ERROR,
  CLEAR_RESPONSE,
  PROFILE_POST_ADDED,
  FEED_POST_ADDED,
  FEED_POST_UNLIKED,
  LIKE_POST_ERROR,
  UNLIKE_POST_ERROR,
  PROFILE_POST_LIKED,
  FEED_POST_LIKED,
  PROFILE_POST_UNLIKED,
  ADD_COMMENT_ERROR,
  FEED_COMMENT_ADDED,
  PROFILE_COMMENT_ADDED,
  FEED_COMMENTS_RECEIVED,
  GET_FEED_COMMENTS_ERROR,
  PROFILE_COMMENTS_RECEIVED,
  GET_PROFILE_COMMENTS_ERROR,
} from "./types";
import axios from "../../utils/API";
import { returnResponse } from "./responseActions";

export const createPost = ({ post, isHome }) => {
  return async(dispatch) => {
    let postImageName = null;

    if (post.postImageName) {
      const formData = new FormData();
      formData.append("file", post.postImageName);

      await axios.post("file/upload", formData).then(res => {
        dispatch({
          type: IMAGE_SAVED
        });

        postImageName = res.data.filename;
      })
      .catch(err => {
        dispatch({
          type: SAVE_IMAGE_ERROR
        });
      });
    }

    post.postImageName = postImageName;

    await axios.post("posts/createPost", post).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_POST_ADDED,
          payload: res.data.post
        });

        dispatch(
          returnResponse(res.data, res.status, FEED_POST_ADDED)
        );
        
        return;
      }

      dispatch({
        type: PROFILE_POST_ADDED,
        payload: res.data.post
      });
      dispatch(
        returnResponse(res.data, res.status, PROFILE_POST_ADDED)
      );
    })
    .catch(err => {
      dispatch({
        type: CREATION_POST_ERROR
      });
      dispatch(
        returnResponse(err.response?.data, err.response?.status, CREATION_POST_ERROR)
      );
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
};

export const addLike = ({ user, post, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/addLike", { user, post }).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_POST_LIKED,
          payload: res.data
        });

        return;
      }

      dispatch({
        type: PROFILE_POST_LIKED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: LIKE_POST_ERROR
      });
    });
  };
};

export const removeLike = ({ user, post, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/removeLike", { user, post }).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_POST_UNLIKED,
          payload: res.data
        });
        return;
      }

      dispatch({
        type: PROFILE_POST_UNLIKED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: UNLIKE_POST_ERROR
      });
    });
  };
};

export const addComment = ({ userComment, postId, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/addComment", { userComment, postId }).then(res => {
      if (isHome) {
        return dispatch({
          type: FEED_COMMENT_ADDED,
          payload: res.data
        });
      }

      dispatch({
        type: PROFILE_COMMENT_ADDED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_COMMENT_ERROR
      });
    });
  };
};

export const getComments = ({ post, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/getComments", { post }).then(res => {
      if (isHome) {
        return dispatch({
          type: FEED_COMMENTS_RECEIVED,
          payload: res.data.post
        });
      }

      dispatch({
        type: PROFILE_COMMENTS_RECEIVED,
        payload: res.data.post
      });
    })
    .catch(error => {
      if (isHome) {
        return dispatch({
          type: GET_FEED_COMMENTS_ERROR
        });
      }

      dispatch({
        type: GET_PROFILE_COMMENTS_ERROR
      });
    });
  };
}