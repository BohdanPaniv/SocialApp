import "./sideBar.scss";
import { PeopleAlt, RssFeed } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBard = () => {
  const user = useSelector(store => store.auth.user);

  return (
    <div className="side-bar">
      <div className="wrapper">
        <ul className="wrapper-list">
          <li className="list-item">
            <Link
              to={`/profile/${user.id}`}
              className="item-link"
            >
              <img 
                src="/assets/lion.jpg"
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
        </ul>
        <hr className="wrapper-hr"/>
      </div>
    </div>
  );
};

export default SideBard;
