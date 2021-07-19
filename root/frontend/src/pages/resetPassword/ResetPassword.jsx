import "./resetPassword.scss";
import ResetPasswordCard from "../../components/resetPasswordCard/ResetPasswordCard";
import CheckEmailCard from "../../components/checkEmailCard/CheckEmailCard";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useMessage } from "../../hooks/useMessage";

const ResetPassword = ({ confirmed }) => {
  const response = useSelector(state => state.response);
  const message = useMessage();

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);

  return (
    <div className="reset-password-page">
      <h1 className="logo">
        SocialApp
      </h1>
      {confirmed ? (
        <ResetPasswordCard />
      ) : (
        <CheckEmailCard />
      )}
    </div>
  );
};

export default ResetPassword;
