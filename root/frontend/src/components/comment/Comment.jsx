import "./comment.scss";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const Comment = ({ user, comment }) => {
  const path = process.env.REACT_APP_GET_FILE;
  const date = new Date(comment.date).toLocaleString();
  const ownerLink = `/profile/${comment.userId}`;
  const profilePictureName = comment.profilePictureName ? path + comment.profilePictureName : "/assets/default-user.png";

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
