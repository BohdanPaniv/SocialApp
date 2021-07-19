import "./home.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import HomeRightBar from "../../components/homeRightBar/HomeRightBar";
import { useMessage } from "../../hooks/useMessage";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

const Home = () => {
  const message = useMessage();
  const response = useSelector(state => state.response);
  const path = process.env.REACT_APP_GET_FILE;
  const user = useSelector(store => store.auth.user);
  const profilePictureName = user.profilePictureName ? path + user.profilePictureName : "/assets/default-user.png";

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);

  return (
    <div className="home-page">
      <TopBar 
        profilePictureName={profilePictureName}
        user={user}
        owner={user}
        location="Home"
        search
      />
      <div className="home-page-container">
        <SideBar
          user={user} 
          profilePictureName={profilePictureName}
        />
        <Feed 
          user={user} 
          isHome={true} 
          owner={user}
          profilePictureName={profilePictureName}
        />
        <HomeRightBar user={user}/>
      </div>
    </div>
  );
};

export default Home;
