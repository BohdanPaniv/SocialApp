import "./comment.scss";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect, useCallback } from "react";

const Comment = ({ user, comment }) => {
  const path = process.env.REACT_APP_GET_FILE;
  const date = new Date(comment.date).toLocaleString();
  const ownerLink = `/profile/${comment.userId}`;
  const defaultProfilePicture = "/assets/default-user.png";
  const [profilePictureName, setProfilePictureName] = useState(defaultProfilePicture);

  const setUserData = useCallback(() => {
    if (comment.profilePictureName) {
      setProfilePictureName(path + comment.profilePictureName);
    }
  }, [comment.profilePictureName, path]);

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  return(
    <>
      {comment.userName ? (
        <div className="comment-item">
          <Link to={ownerLink}>
            <img
              src={profilePictureName}
              alt="error" 
              className="post-icon"
            />
          </Link>
          <div className="comment-text">
            <div className="user-data">
              <Link
                to={ownerLink}
                className="user-name"
              >
                {`${comment?.userName} ${comment?.userSurname}`}
              </Link>
              <span className="date">
                {date}
              </span>
            </div>
            <span className="comment-input">
              {comment.comment}
            </span>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Comment;
