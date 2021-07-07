import "./sideBar.scss";
import {
  PeopleAlt,
  RssFeed,
  ExitToApp ,
  Settings
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/actions/authActions";

const SideBard = ({user, imageHref}) => {
  const dispatch = useDispatch();

  const logout = (event) => {
    event.preventDefault();

    dispatch(logOut());
  }

  return (
    <div className="side-bar">
      <div className="wrapper">
        <ul className="wrapper-list">
          <li className="list-item">
            <Link
              to={`/profile/${user._id}`}
              className="item-link"
            >
              <img 
                src={ imageHref }
                alt="error"
                className="image icon"
              />
              <span className="item-text">
                Profile
              </span>
            </Link>
          </li>
          <li className="list-item">
            <Link
              to="/"
              className="item-link"
            >
              <RssFeed className="icon" />
              <span className="item-text">
                Feed
              </span>
            </Link>
          </li>
          <li className="list-item">
            <Link
              to="/"
              className="item-link"
            >
              <PeopleAlt className="icon" />
              <span className="item-text">
                Friends
              </span>
            </Link>
          </li>
          <li className="list-item">
            <div className="item-link">
              <Settings className="icon" />
              <span className="item-text">
                Settings
              </span>
            </div>
          </li>
          <li className="list-item" onClick={event => logout(event)}>
            <div className="item-link">
              <ExitToApp className="icon" />
              <span className="item-text">
                Exit
              </span>
            </div>
          </li>
        </ul>
        <hr className="wrapper-hr"/>
      </div>
    </div>
  );
};

export default SideBard;
