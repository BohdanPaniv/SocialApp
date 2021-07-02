import "./authentication.scss";
import { useState, useEffect } from "react";
import LoginCard from "../../components/authentication/loginCard/LoginCard";
import RegisterCard from "../../components/authentication/registerCard/RegisterCard";
import { useMessage } from "../../hooks/useMessage";
import { useSelector } from 'react-redux';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const message = useMessage();
  const response = useSelector(state => state.response);

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <h1 className="auth-logo">
            SocialApp
          </h1>
          <span className="auth-desc">
            Connect to the world, connect to SocialApp.
          </span>
        </div>
        <div className="auth-right">
          {
            isLogin ? 
              <LoginCard
                isLogin={ isLogin }
                setIsLogin={ setIsLogin }
              /> 
              : 
              <RegisterCard
                isLogin={ isLogin }
                setIsLogin={ setIsLogin }
              />
          }
        </div>
      </div>
    </div>
  );
};

export default Authentication;
