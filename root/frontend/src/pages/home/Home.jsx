import "./home.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
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
      <TopBar imageHref={imageHref}/>
      <div className="home-page-container">
        <SideBar
          user={user} 
          imageHref={imageHref}
        />
        <Feed 
          user={user} 
          isHome={true} 
          owner={user}
        />
        <RightBar />
      </div>
    </div>
  );
}

export default Home;
