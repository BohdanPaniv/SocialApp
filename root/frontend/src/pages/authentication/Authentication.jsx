import "./authentication.scss";
import { useState } from "react";
import LoginCard from "../../components/loginCard/LoginCard";
import RegisterCard from "../../components/registerCard/RegisterCard";

const Authentication = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth">
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
                setIsLogin={ setIsLogin }/> 
              : 
              <RegisterCard
                isLogin={ isLogin }
                setIsLogin={ setIsLogin }/>
          }
        </div>
      </div>
    </div>
  );
}

export default Authentication;
