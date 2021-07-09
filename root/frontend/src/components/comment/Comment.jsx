import "./comment.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions/userActions";
import CircularProgress from '@material-ui/core/CircularProgress';

const Comment = ({ user, comment }) => {
  const path = process.env.REACT_APP_GET_FILE;
  const profileStartPath = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const date = new Date(comment.date).toLocaleString();
  const ownerLink = profileStartPath + `profile/${comment.userId}`;

  useEffect(() => {
    const data = dispatch(getUser(comment));
    let isMount = true;

    data.then(res => {
      if (isMount) {
        setOwner(res.user);
      }
    });

    return () => {
      isMount = false;
    }
  }, [dispatch, comment]);

  return(
    <>
    {
      owner ?
      <div className="comment-item">
        <a href={ ownerLink }>
          <img
            src={ path + owner.profilePicture }
            alt="error" 
            className="post-icon"
          />
        </a>
        <div className="comment-text">
          <div className="user-data">
            <a
              href={ ownerLink }
              className="user-name"
            >
              {`${owner?.name} ${owner?.surname}`}
            </a>
            <span className="date">
              { date }
            </span>
          </div>
          <span className="comment-input">
            { comment.comment }
          </span>
        </div>
      </div>
    :
    <CircularProgress />

    }
    </>
  )
}

export default Comment;
