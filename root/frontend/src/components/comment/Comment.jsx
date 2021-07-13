import "./comment.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions/userActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";

const Comment = ({ user, comment }) => {
  const path = process.env.REACT_APP_GET_FILE;
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const date = new Date(comment.date).toLocaleString();
  const ownerLink = `/profile/${comment.userId}`;

  useEffect(() => {
    const data = dispatch(getUser(comment));
    let isMount = true;

    data.then(res => {
      if (isMount && res) {
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
        <Link to={ ownerLink }>
          <img
            src={ path + owner.profilePicture }
            alt="error" 
            className="post-icon"
          />
        </Link>
        <div className="comment-text">
          <div className="user-data">
            <Link
              to={ ownerLink }
              className="user-name"
            >
              {`${owner?.name} ${owner?.surname}`}
            </Link>
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
