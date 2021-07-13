import "./topBar.scss";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const TopBar = ({ imageHref, user, location, owner, search, setSearch, switchingCounter }) => {
  const ownerLink = `/profile/${user?._id}`;
  const history = useHistory();

  return (
    <div className="top-bar-container">
      <div className="top-bar-left">
        <Link to="/" className="href">
          <span className="logo">
            Social App
          </span>
          <img 
            src="/favicon/android-chrome-192x192.png" 
            alt="error" 
            className="image logo-image"
          />
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
        <div className="menu-bar">
          <IconButton
            edge="start" 
            color="inherit" 
            aria-label="menu"
            onClick={() => history.push("/bookmarks") }
          >
            <MenuIcon />
          </IconButton>
        </div>
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
