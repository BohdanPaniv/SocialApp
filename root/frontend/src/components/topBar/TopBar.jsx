import "./topBar.scss";
import { Search } from "@material-ui/icons";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch  } from "react-redux";
import { seacrhForFeed } from "../../store/actions/feedPostsActions";

const TopBar = ({ imageHref, user, location }) => {
  const search = useRef();
  const dispatch = useDispatch();
  const ownerLink = `/profile/${user?._id}`;

  const searchForPosts = (event) => {
    event.preventDefault();

    switch (location) {
      case "Home":
        const data = {
          _id: user._id,
          search: search.current.value
        };
        dispatch(seacrhForFeed(data))
        break;
      default:
        break;
    }
  }

  return (
    <div className="top-bar-container">
      <div className="top-bar-left">
        <Link to="/" className="href">
          <span className="logo">
            Social App
          </span>
        </Link>
      </div>
      <div className="top-bar-center">
        <form
          className="search-form" 
          noValidate 
          onSubmit={ event => searchForPosts(event) }
        >
          <div className="form-action">
            <button
              type="submit"
              className="search-btn"
            >
              <Search className="seacrh-icon" />
            </button>
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search for friends, posts"
              className="search-input"
              ref={ search }
            />
          </div>
        </form>
      </div>
      <div className="top-bar-right">
        <Link
          className="profile-menu"
          to={ ownerLink }
        >
          <img
            src={ imageHref }
            alt="error"
            className="image"
          />
          <span className="name">
            { user?.name }
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
