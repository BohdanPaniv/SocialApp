import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { getFeed } from "../../store/actions/feedActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user);
  const feed = useSelector(store => store.feed?.feed);

  useEffect(() => {
    dispatch(getFeed(user));
  },[dispatch, user]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {
          feed && feed.map(post => (
            <Post key={post._id} post={post}/>
          ))
        }
      </div>
    </div>
  );
};

export default Feed;
