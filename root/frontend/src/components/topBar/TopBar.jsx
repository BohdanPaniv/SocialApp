import "./topBar.scss";
import { useSelector } from "react-redux";
import { Search } from "@material-ui/icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
  const user = useSelector(state => state.auth.user);
  const searchField = useRef();

  const search = (event) => {
    event.preventDefault();

    console.log(`Seacrh: ${searchField.current.value}`);
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
        <form className="search-form" noValidate>
          <div className="form-action">
            <button
              type="submit"
              className="search-btn"
              onClick={event => search(event) }
            >
              <Search className="seacrh-icon" />
            </button>
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search for friends, posts or video"
              className="search-input"
              ref={ searchField }
            />
          </div>
        </form>
      </div>
      <div className="top-bar-right">
        <Link
          className="profile-menu"
          to={`/profile/${user.id}`}
        >
          <img
            src="/assets/lion.jpg"
            alt="error"
            className="image"
          />
          <span className="name">
            { user.name }
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
