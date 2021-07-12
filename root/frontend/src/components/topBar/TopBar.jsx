import "./topBar.scss";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";

const TopBar = ({ imageHref, user, location, owner, search, setSearch, switchingCounter }) => {
  const ownerLink = `/profile/${user?._id}`;

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
        {
          search &&
          <SearchBar 
            owner={ owner }
            location={ location }
            setSearch={ setSearch }
            switchingCounter={ switchingCounter }
          />
        }
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
