import "./loginCard.scss";
import {
  TextField,
  Button
} from "@material-ui/core";
import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../../card/Card";
import { useDispatch } from "react-redux";
import { logIn } from "../../../store/actions/authActions";

const LoginCard = ({ isLogin, setIsLogin }) => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  const changeIsLogin = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin, setIsLogin]);

  const signIn = (event) => {
    event.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value
    };

    dispatch(logIn(user));
  };

  return (
    <div className="login-card">
      <Card>
        <form 
          className="login-form" 
          noValidate 
          onSubmit={event => signIn(event)}
        >
          <div className="form-control">
            <TextField
              type="email"
              inputRef={email}
              className="form-input"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="form-control">
            <TextField 
              type="password"
              inputRef={password}
              autoComplete="on"
              className="form-input"
              label="Password" 
              variant="outlined"
            />
          </div>
          <div className="form-action">
            <Button
              variant="contained" 
              className="login-button"
              color="primary"
              type="submit"
            >
              Log In
            </Button>
          </div>
          <div className="form-content">
            <Link
              to="/resetPassword"
              className="link"
            >
              <span className="change-password-link">
                Forgot Password?
              </span>
            </Link>
          </div>
          <div className="form-action last-element">
            <Button 
              variant="contained" 
              className="create-button"
              color="primary"
              onClick={changeIsLogin}
            >
              Create New Account
            </Button>
          </div>      
        </form>
      </Card>
    </div>
  );
};

export default LoginCard;
