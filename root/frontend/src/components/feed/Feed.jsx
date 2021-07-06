import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { getFeed } from "../../store/actions/feedPostsActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = ({ user, isHome, owner }) => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feedPosts?.feed);

  useEffect(() => {
    dispatch(getFeed(owner));
  }, [dispatch, owner]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {
          owner.id === user.id &&
          <Share isHome/>
        }
        {
          feed && feed.map(post => (
            <Post
              key={post._id}
              post={post}
              user={user}
              isHome
            />
          ))
        }
      </div>
    </div>
  );
};

export default Feed;
