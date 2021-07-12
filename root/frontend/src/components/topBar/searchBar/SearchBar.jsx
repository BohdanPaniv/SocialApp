import "./searchBar.scss";
import { searchForFeed } from "../../../store/actions/feedPostsActions";
import { searchForProfilePosts } from "../../../store/actions/profilePostsActions";
import { Search } from "@material-ui/icons";
import { useRef, useEffect } from "react";
import { useDispatch  } from "react-redux";

const SearchBar = ({ owner, location, setSearch, switchingCounter }) => {
  const searchField = useRef();
  const dispatch = useDispatch();

  const searchForPosts = (event) => {
    event.preventDefault();

    if (setSearch) {
      setSearch(searchField.current.value);
    }
    
    const data = {
      _id: owner._id,
      search: searchField.current.value
    };

    switch (location) {
      case "Home":
        dispatch(searchForFeed(data));
        break;
      case "Profile":
        dispatch(searchForProfilePosts(data));
        break;
      case "Contacts":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    searchField.current.value = "";
  }, [switchingCounter]);

  console.log(switchingCounter)

  return (
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
          placeholder="Search for contacts, posts"
          className="search-input"
          ref={ searchField }
        />
      </div>
    </form>
  );
};

export default SearchBar;
