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
  const user = useSelector(store => store.auth.user);
  const path = process.env.REACT_APP_GET_FILE;
  const imageHref = user.profilePicture ? path + user.profilePicture : "/assets/default-user.png";

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);

  return (
    <div className="home-page">
      <TopBar 
        imageHref={ imageHref }
        user={ user }
        owner={ user }
        location="Home"
        search
      />
      <div className="home-page-container">
        <SideBar
          user={ user } 
          imageHref={ imageHref }
        />
        <Feed 
          user={ user } 
          isHome={ true } 
          owner={ user }
        />
        <HomeRightBar user={ user }/>
      </div>
    </div>
  );
};

export default Home;
