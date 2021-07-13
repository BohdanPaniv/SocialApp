import "./Bookmarks.scss";
import TopBar from "../../components/topBar/TopBar";
import { useSelector } from 'react-redux';
import SideBar from "../../components/sideBar/SideBar";

const Bookmarks = () => {
  const user = useSelector(store => store.auth.user);
  const path = process.env.REACT_APP_GET_FILE;
  const imageHref = user.profilePicture ? path + user.profilePicture : "/assets/default-user.png";
  return (
    <div className="bookmarks-page">
      <TopBar 
        imageHref={ imageHref }
        user={ user }
        owner={ user }
        location="Home"
        search
      />
       <div className="bookmarks-page-container">
        <SideBar
          user={ user } 
          imageHref={ imageHref }
        />
      </div>
    </div>
  );
};

export default Bookmarks;
