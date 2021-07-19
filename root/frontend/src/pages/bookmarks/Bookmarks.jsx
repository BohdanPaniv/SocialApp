import "./Bookmarks.scss";
import TopBar from "../../components/topBar/TopBar";
import { useSelector } from 'react-redux';
import SideBar from "../../components/sideBar/SideBar";

const Bookmarks = () => {
  const user = useSelector(store => store.auth.user);
  const path = process.env.REACT_APP_GET_FILE;
  const profilePictureName = user.profilePictureName ? path + user.profilePictureName : "/assets/default-user.png";
  
  return (
    <div className="bookmarks-page">
      <TopBar 
        profilePictureName={profilePictureName}
        user={user}
        owner={user}
        location="Home"
        search
      />
       <div className="bookmarks-page-container">
        <SideBar
          user={user} 
          profilePictureName={profilePictureName}
        />
      </div>
    </div>
  );
};

export default Bookmarks;
