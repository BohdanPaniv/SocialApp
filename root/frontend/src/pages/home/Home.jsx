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

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);

  return (
    <div className="home-page">
      <TopBar />
      <div className="home-page-container">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </div>
  );
}

export default Home;
